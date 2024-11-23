import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './style';

export default Button = ({text, onpress}) => {
  return (
    <TouchableOpacity style={styles.buttonLogin} onPress={onpress}>
      <Text style={styles.buttonTextLogin}>{text}</Text>
    </TouchableOpacity>
  )
};
