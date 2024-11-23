import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import questionsData from '../../assets/questions.json';
import { styles } from './style';

const Quiz = ({ navigate }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [lives, setLives] = useState(3); // Número inicial de vidas

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  // Redireciona para a tela Home quando as vidas acabam
  useEffect(() => {
    if (lives === 0) {
      navigate('Home');
    }
  }, [lives]);

  // Verifica se terminou o quiz
  useEffect(() => {
  if (
    currentQuestionIndex === questions.length && // Verifica se todas as perguntas foram respondidas
    questions.length > 0 && // Certifica-se de que há perguntas carregadas
    lives > 0 // Garante que o jogador ainda tenha vidas
  ) {
    navigate('Success'); // Redireciona para a tela de sucesso
  }
}, [currentQuestionIndex, questions, lives]);


  const handleAnswer = (option, correctAnswer) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setLives((prevLives) => Math.max(prevLives - 1, 0)); // Reduz vidas ao errar
    }

    // Aguarda um momento e avança para a próxima pergunta
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reseta a seleção para a próxima pergunta
      setIsCorrect(null);
    }, 1000);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const correctAnswer = currentQuestion['Correct Answer'];
    const options = [
      currentQuestion['Option A'],
      currentQuestion['Option B'],
      currentQuestion['Option C'],
      currentQuestion['Option D'],
    ];

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion['Question Text']}</Text>
        {options.map((option, index) => {
          const isSelected = option === selectedOption;
          const optionStyle = isSelected
            ? isCorrect
              ? styles.correctOption
              : styles.incorrectOption
            : styles.optionButton;

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswer(option, correctAnswer)}
              disabled={selectedOption !== null} // Desabilita os botões após a seleção
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleGoHome = () => {
    navigate('Home');
  };

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoHome} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Progress.Bar
          progress={progress}
          width={200}
          color="#6A5ACD"
          unfilledColor="#D3D3D3"
          borderColor="#6A5ACD"
        />
        <View style={styles.livesContainer}>
          <FontAwesome name="heart" size={20} color="#FF6A6A" />
          <Text style={styles.livesText}>{lives}</Text>
        </View>
      </View>
      {questions.length > 0 ? (
        renderQuestion()
      ) : (
        <Text>Carregando perguntas...</Text>
      )}
    </View>
  );
};

export default Quiz;
