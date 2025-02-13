import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./images/gg.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to LangMaster!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>About LangMaster</Text>
        <Text style={styles.text}>
          LangMaster is your all-in-one language learning companion. 
          It helps you analyze text using OCR and Speech-to-Text (STT) technology, 
          providing meanings, synonyms, and translations in Hindi, Kannada, and Urdu.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Features</Text>
        <Text style={styles.text}>• OCR: Extract text from images effortlessly.</Text>
        <Text style={styles.text}>• Speech-to-Text: Convert spoken words to text.</Text>
        <Text style={styles.text}>• Meaning: Understand words with detailed meanings.</Text>
        <Text style={styles.text}>• Synonym Finder: Expand your vocabulary with synonyms.</Text>
        <Text style={styles.text}>• Translations: Translate text into Hindi, Kannada, and Urdu.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 300, 
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    color: 'gold', 
    fontSize: 28,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  heading: {
    color: 'gold', 
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'green', 
    fontSize: 20,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default Home;
