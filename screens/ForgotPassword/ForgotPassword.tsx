import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { TextInputMask } from 'react-native-masked-text';

import CustomInput from '../../components/CustomInput/CustomInput';

import Button from '../../components/Button/Button';

import {COLORS} from '../../assets/colors/colors';

export default function ForgotPassword({ navigate }) {
  const [isEmail, setIsEmail] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(input));
  };

  const validatePhoneNumber = (input) => {
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    setIsValid(phoneRegex.test(input));
  };

  const handleInputChange = (input) => {
    setInputValue(input);
    if (isEmail) {
      validateEmail(input);
    } else {
      validatePhoneNumber(input);
    }
  };

  const handleLink = () => {
    navigate('Code');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonIcon} onPress={() => navigate('Login')}>
        <Ionicons 
          name='arrow-back-outline'
          size={23}
          color={COLORS.purpleLight}
        />
      </TouchableOpacity>
      <Text style={styles.texth1}>🔑 Forgot Password?</Text>
      <Text style={styles.textp}>Fill the field bellow and we'll send a code of verification to your e-mail or phone.</Text>
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setIsEmail(true)}>
          <Text style={[styles.switchText, isEmail && styles.activeText]}>E-Mail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEmail(false)}>
          <Text style={[styles.switchText, !isEmail && styles.activeText]}>Phone Number</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>
        {isEmail ? 'Type your E-Mail' : 'Type your Phone Number'}
      </Text>

      <View style={styles.inputContainer}>
        <CustomInput 
          type={isEmail ? 'email' : 'phone'}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={isEmail ? 'oktavio@gowstudio.pro' : '(00) 00000-0000'}
          validate={isValid}
          keyboardType={isEmail ? 'email-address' : 'phone-pad'}
        />  
      </View>
      
      <Button text={'Send Link'} onpress={handleLink}/>
      <View style={styles.resend}>
        <Ionicons
          name={'phone-portrait-outline'}
          size={20}
          color="#5D5B65"
        />
        <TouchableOpacity>
          <Text style={styles.resendText}>I didn't received any code</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}
