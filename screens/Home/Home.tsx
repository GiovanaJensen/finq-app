import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

import Owl from '../../assets/owl.png';
import Button from '../../components/Button/Button';

import {COLORS} from '../../assets/colors/colors';

export default function Home({ navigate }) {

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}
