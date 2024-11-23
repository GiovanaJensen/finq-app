import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { styles } from './style';

const Quiz = ({ navigate }) => {
  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); 
  const [lives, setLives] = useState(3); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/quiz'); 
        const data = await response.json();
        
        if (data && data.questions) {
          setQuestions(data.questions);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
        }
      } catch (error) {
        console.error('Erro ao carregar as perguntas:', error);
        Alert.alert('Erro', 'Falha ao carregar as perguntas. Tente novamente.');
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (lives === 0) {
      navigate('Home');
    }
  }, [lives]);

  useEffect(() => {
    if (
      currentQuestionIndex === questions.length &&
      questions.length > 0 &&
      lives > 0 
    ) {
      navigate('Success');
    }
  }, [currentQuestionIndex, questions, lives]);

  const handleAnswer = (option, correctAnswer) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setLives((prevLives) => Math.max(prevLives - 1, 0));
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
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
              disabled={selectedOption !== null}
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