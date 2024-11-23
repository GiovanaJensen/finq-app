import { StyleSheet } from 'react-native';
import {COLORS} from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.purple,
    textAlign: 'center',
    fontFamily: 'archivo',
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.purple,
  },
  optionText: {
    fontFamily: 'archivo',
    fontSize: 14,
    color: COLORS.purpleLight
  },
  correctOption: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#13CF4C',
    color: '#13CF4C'
  },
  incorrectOption: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#F64F77',
    color: '#F64F77'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livesText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#FF6A6A',
  },
});
