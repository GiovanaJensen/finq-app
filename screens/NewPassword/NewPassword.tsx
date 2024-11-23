import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/Button/Button';

import { COLORS } from '../../assets/colors/colors';

export default function NewPassword({ navigate }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handlePasswordChange = (input) => {
      setPassword(input);
      const isValidLength = input.length >= 8;
      setIsPasswordValid(isValidLength);
      setIsPasswordMatch(isValidLength && input === confirmPassword); 
  };

  const handleConfirmPasswordChange = (input) => {
      setConfirmPassword(input);
      setIsPasswordMatch(password === input && input.length >= 8); 
  };

  const handleLink = async () => {
    if (!isPasswordMatch) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/api/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password, 
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password reset successfully!");
        navigate('Welcome');
      } else {
        Alert.alert("Error", data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      Alert.alert("Error", "Failed to reset password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonIcon}
        onPress={() => navigate('ForgotPassword')}>
        <Ionicons
          name="arrow-back-outline"
          size={23}
          color={COLORS.purpleLight}
        />
      </TouchableOpacity>
      <Text style={styles.texth1}>🔑 New Password</Text>
      <Text style={styles.textp}>
        Fill the field below to set your new password.
      </Text>

      <Text style={styles.textinput}>New Password</Text>
      <CustomInput
        type="password"
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="******"
        keyboardType="default"
        validate={isPasswordValid && isPasswordMatch}
      />

      <Text style={styles.textinput}>Confirm Password</Text>
      <CustomInput
        type="password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        placeholder="******"
        keyboardType="default"
        validate={isPasswordMatch}
      />

      <Button text={'Reset Password'} onpress={handleLink} />
    </View>
  );
}