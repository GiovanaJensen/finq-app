import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

import Button from '../../components/Button/Button';

import {COLORS} from '../../assets/colors/colors';

export default function ForgotPassword({ navigate }) {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [code5, setCode5] = useState('');
  const [isCodeFocused1, setIsCodeFocused1] = useState(false);
  const [isCodeFocused2, setIsCodeFocused2] = useState(false);
  const [isCodeFocused3, setIsCodeFocused3] = useState(false);
  const [isCodeFocused4, setIsCodeFocused4] = useState(false);
  const [isCodeFocused5, setIsCodeFocused5] = useState(false);

  const handleLink = () => {
    navigate('NewPassword');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonIcon} onPress={() => navigate('ForgotPassword')}>
        <Ionicons 
          name='arrow-back-outline'
          size={23}
          color={COLORS.purpleLight}
        />
      </TouchableOpacity>
      <Text style={styles.texth1}>📱 Type code bellow?</Text>
      <Text style={styles.textp}>Fill the field bellow and we'll send a code of verification to your e-mail or phone.</Text>

      <View style={styles.grid}>
        <TextInput style={ [
            { flex: 1, borderWidth: 1, borderColor: "#F8F6FF", color: COLORS.purpleLight,  width: '20%', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 18}, 
            isCodeFocused1 && {borderColor: COLORS.purpleLight}]}
          onFocus={() => setIsCodeFocused1(true)}
          onBlur={() => setIsCodeFocused1(false)}
          onChangeText={(input) => {
            setCode1(input);
            }}
          value={code1}
          placeholder=""
          placeholderTextColor={COLORS.purpleLight} 
        />
        <TextInput style={ [
            { flex: 1, borderWidth: 1, borderColor: "#F8F6FF", color: COLORS.purpleLight,  width: '20%', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 18}, 
            isCodeFocused2 && {borderColor: COLORS.purpleLight}]}
          onFocus={() => setIsCodeFocused2(true)}
          onBlur={() => setIsCodeFocused2(false)}
          onChangeText={(input) => {
            setCode2(input);
            }}
          value={code2}
          placeholder=""
          placeholderTextColor={COLORS.purpleLight} 
        />
        <TextInput style={ [
            { flex: 1, borderWidth: 1, borderColor: "#F8F6FF", color: COLORS.purpleLight,  width: '20%', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 18}, 
            isCodeFocused3 && {borderColor: COLORS.purpleLight}]}
          onFocus={() => setIsCodeFocused3(true)}
          onBlur={() => setIsCodeFocused3(false)}
          onChangeText={(input) => {
            setCode3(input);
            }}
          value={code3}
          placeholder=""
          placeholderTextColor={COLORS.purpleLight} 
        />
        <TextInput style={ [
            { flex: 1, borderWidth: 1, borderColor: "#F8F6FF", color: COLORS.purpleLight,  width: '20%', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 18}, 
            isCodeFocused4 && {borderColor: COLORS.purpleLight}]}
          onFocus={() => setIsCodeFocused4(true)}
          onBlur={() => setIsCodeFocused4(false)}
          onChangeText={(input) => {
            setCode4(input);
            }}
          value={code4}
          placeholder=""
          placeholderTextColor={COLORS.purpleLight} 
        />
        <TextInput style={ [
            { flex: 1, borderWidth: 1, borderColor: "#F8F6FF", color: COLORS.purpleLight,  width: '20%', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 18}, 
            isCodeFocused5 && {borderColor: COLORS.purpleLight}]}
          onFocus={() => setIsCodeFocused5(true)}
          onBlur={() => setIsCodeFocused5(false)}
          onChangeText={(input) => {
            setCode5(input);
            }}
          value={code5}
          placeholder=""
          placeholderTextColor={COLORS.purpleLight} 
        />
      </View>
      
      <Button text={'Confirm'} onpress={handleLink}/>
      <View style={styles.resend}>
        <Ionicons
          name={'time-outline'}
          size={20}
          color={COLORS.purpleLight}
        />
        <Text style={styles.resendText}>The code expires in 
          <Text style={styles.time}>1:00</Text>
        </Text>
      </View>
  </View>
  )
}
