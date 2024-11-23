import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

import { COLORS } from '../../assets/colors/colors';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/Button/Button';

export default function Registration({ navigate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    password: '',
    confirmPassword: '',
    preferences: [],
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === 'email') {
      validateEmail(value);
    }
    if (field === 'password') {
      const isValidLength = value.length >= 8;
      setIsPasswordValid(isValidLength);
      setIsPasswordMatch(isValidLength && value === formData.confirmPassword);
    }
    if (field === 'confirmPassword') {
      setIsPasswordMatch(formData.password === value && value.length >= 8);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleTogglePreference = (preference) => {
    setFormData((prevData) => {
      const preferences = prevData.preferences.includes(preference)
        ? prevData.preferences.filter((p) => p !== preference)
        : [...prevData.preferences, preference];
      return { ...prevData, preferences };
    });
  };

  const handleNext = () => {
    if (step === 5) {
      handleSubmit();  
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!isPasswordMatch || !isEmailValid) {
      Alert.alert('Error', 'Please make sure all fields are filled correctly.');
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      university: formData.university,
      password: formData.password,
      preferences: formData.preferences,
    };

    try {
      const response = await fetch('http://localhost:3333/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        navigate('WelcomeRegister');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.title}>👋 What's your name and best E-Mail?</Text>
            <Text style={styles.textInput}>Full Name</Text>
            <CustomInput
              placeholder="Otávio Alexandre"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              keyboardType="default"
              validate={false}
            />
            <Text style={styles.textInput}>E-mail</Text>
            <CustomInput
              placeholder="oktavio@gowstudio.pro"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="default"
              validate={isEmailValid}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.title}>📱 Type a phone number</Text>
            <Text style={styles.textInput}>Phone Number</Text>
            <CustomInput
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="number"
              validate={false}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.title}>📚 Where did you study or are studying?</Text>
            <Text style={styles.textInput}>University Name</Text>
            <CustomInput
              placeholder="FATEC Baixada Santista"
              value={formData.university}
              onChangeText={(text) => handleInputChange('university', text)}
              keyboardType="default"
              validate={false}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={styles.title}>🔑 Create your password</Text>
            <Text style={styles.textInput}>Password</Text>
            <CustomInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              keyboardType="default"
              validate={isPasswordValid && isPasswordMatch}
            />
            <Text style={styles.textInput}>Confirm Password</Text>
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              keyboardType="default"
              validate={isPasswordMatch}
            />
            {!isPasswordMatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={[styles.title, step === 5 && { color: '#FFF' }]}>
              🧠 Select what you want to learn here
            </Text>
            {['Investment Banking', 'Equity Research', 'Credit', 'Private Equity', 'Venture Capital', 'Capital Markets'].map((preference) => (
              <TouchableOpacity
                key={preference}
                style={[
                  styles.preferenceButton,
                  formData.preferences.includes(preference) && styles.selected,
                ]}
                onPress={() => handleTogglePreference(preference)}
              >
                <Text style={styles.preferenceText}>{preference}</Text>
                {formData.preferences.includes(preference) && (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, step === 5 && { backgroundColor: COLORS.purpleDark }]}>
      <View style={styles.progressContainer}>
        {step > 1 && (
          <TouchableOpacity
            style={styles.buttonIcon}
            onPress={handlePrev}
          >
            <Ionicons
              name="arrow-back-outline"
              size={23}
              color="#8C52FF"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.progressText}>{`${step}`}</Text>
      </View>

      {renderContent()}

      <View style={styles.buttonContainer}>
        <Button text={step === 5 ? "Get Started" : "Next"} onpress={handleNext} />
      </View>
    </View>
  );
}