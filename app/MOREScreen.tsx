import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const MoreScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>More Options</Text>

      <CustomButton title="Synonyms" onPress={() => navigation.navigate('Synonyms')} style={styles.button} />
      <CustomButton title="Meaning" onPress={() => navigation.navigate('Meaning')} style={styles.button} />
      <CustomButton title="Translation" onPress={() => navigation.navigate('Translation')} style={styles.button} />

      <CustomButton title="Back" onPress={() => navigation.goBack()} style={styles.backButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    width: '100%',
  },
  backButton: {
    marginTop: 30,
    width: '50%',
  },
});

export default MoreScreen;
