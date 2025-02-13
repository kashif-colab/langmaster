import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const More = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>More Features Coming Soon!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'gold',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default More;
