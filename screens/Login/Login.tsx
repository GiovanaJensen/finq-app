import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Owl from '../../assets/owl.png';
import Button from '../../components/Button/Button';

import { COLORS } from '../../assets/colors/colors';

export default function Login({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showPasswordCheckIcon, setShowPasswordCheckIcon] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowCheckIcon(emailRegex.test(input));
  };

  const validatePassword = (input) => {
    setShowPasswordCheckIcon(input.length >= 8);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        await AsyncStorage.setItem('userToken', token);

        navigate('Home');
      } else {
        console.log('Erro de login:', data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer o login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={Owl} style={styles.image} />
        <Text style={styles.texth1}>
          <Text style={styles.texth12}>Unlock</Text> Your Financial Future with FinQ
        </Text>
      </View>
      <View style={styles.form}>
        {/* Email */}
        <View style={styles.containerInput}>
          <Text style={styles.textinput}>E-mail</Text>
          <View style={styles.containerIcon}>
            <TextInput
              style={[
                { flex: 1, color: COLORS.purpleLight },
                isEmailFocused && { borderColor: COLORS.purpleLight },
              ]}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChangeText={(input) => {
                setEmail(input);
                validateEmail(input);
              }}
              value={email}
              placeholder="oktavio@gowstudio.pro"
              placeholderTextColor={COLORS.purpleLight}
            />
            {showCheckIcon && (
              <Ionicons
                name={'checkmark-circle-outline'}
                size={14}
                color={COLORS.purpleLight}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* Password */}
        <View style={styles.containerInput}>
          <Text style={styles.textinput}>Password</Text>
          <View style={styles.containerIcon}>
            <TextInput
              style={[
                { flex: 1, color: COLORS.purpleLight },
                isPasswordFocused && { borderColor: COLORS.purpleLight },
              ]}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChangeText={(input) => {
                setPassword(input);
                validatePassword(input);
              }}
              value={password}
              placeholder="******"
              placeholderTextColor={COLORS.purpleLight}
              secureTextEntry={!showPassword}
            />
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={14}
              color={COLORS.purpleLight}
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <Button text="Login" onpress={handleLogin} />
      </View>
      <View style={styles.containerRow}>
        <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
          <Text style={styles.textRow}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Register')}>
          <Text style={styles.textRow2}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}