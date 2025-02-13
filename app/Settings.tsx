import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />

      <Text style={styles.title}>Settings</Text>
      
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.text}>
        1. Enter text manually or use OCR/STT to capture input.{"\n"}
        2. Tap 'Analyze' to see the analysis.{"\n"}
        3. Use the Meaning, Synonym, and Translation features as needed.
      </Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.text}>- Text Input Analysis</Text>
      <Text style={styles.text}>- OCR and STT support</Text>
      <Text style={styles.text}>- Meaning, Synonym, and Translation options</Text>

      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>Note:</Text>
        <Text style={styles.noteText}>
          The functions of OCR and STT are currently unavailable, waiting for approval of API requested @google-speech-to-text & @tressaract-ocr.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center', // Center the logo
  },
  logo: {
    width: 300,  // Adjust size as needed
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20, // Space below the logo
  },
  title: {
    color: 'gold',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'gold',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
    width: '100%',
  },
  text: {
    color: 'green',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  noteContainer: {
    backgroundColor: '#222',  // Slightly lighter background for emphasis
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    width: '100%',
  },
  noteTitle: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    color: 'red',
    fontSize: 20,
  },
});

export default Settings;
