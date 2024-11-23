import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

import Coffee from '../../assets/coffee.png';
import Money from '../../assets/money.png';
import Heart from '../../assets/heart.png';
import Button from '../../components/Button/Button';

export default function Success({ navigate }) {

  return (
    <View style={styles.container}>
      <Image source={Coffee} style={styles.image}/>
      <Text style={styles.h1}>You've completed the lesson!</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>EARNED MONEY</Text>
          <View style={styles.money}>
            <Image source={Money}/>
            <Text style={styles.textMoney}>+$12</Text>
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>MORE HEARTS</Text>
          <View style={styles.money}>
            <Image source={Heart}/>
            <Text style={styles.textHeart}>+1</Text>
          </View>
        </View>
      </View>
    </View>
  );
}