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
          • LangMaster is your all-in-one language learning companion.
          • Uses OCR and Speech-to-Text (STT) technology.
          • Provides meanings, synonyms, and translations in Hindi, Kannada, and Urdu.
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
      
      <View style={styles.section}>
        <Text style={styles.heading}>What's New</Text>
        <Text style={styles.text}>• Improved accuracy in OCR and Speech-to-Text.</Text>
        <Text style={styles.text}>• Added support for more languages.</Text>
        <Text style={styles.text}>• Enhanced user interface for a seamless experience.</Text>
        <Text style={styles.text}>• New interactive learning exercises.</Text>
        <Text style={styles.text}>• Additional dictionary support with examples.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Purpose of LangMaster</Text>
        <Text style={styles.text}>• Make language learning accessible and efficient.</Text>
        <Text style={styles.text}>• Bridge the gap between languages through AI-driven tools.</Text>
        <Text style={styles.text}>• Enable users to communicate and learn effortlessly.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  section: {
    backgroundColor: '#222',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  heading: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: 'green',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Home;
