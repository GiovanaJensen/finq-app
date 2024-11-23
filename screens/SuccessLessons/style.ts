import React from 'react';
import {StyleSheet} from 'react-native'
import {COLORS} from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 66
  },
  image: {
    marginBottom: 16
  },
  text: {
    fontFamily: 'archivo',
    fontSize: 16,
    color: COLORS.purple,
    margin: 6
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  column: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  money: {
    flex: 1,
    flexDirection: 'row'
  },
  h1: {
    fontFamily: 'archivo',
    fontSize: 32,
    color: COLORS.purpleDark
  },
  textMoney: {
    fontFamily: 'archivo',
    fontSize: 16,
    color: '#59C36A'
  },
  textHeart: {
    fontFamily: 'archivo',
    fontSize: 16,
    color: '#FF4952'
  }
});