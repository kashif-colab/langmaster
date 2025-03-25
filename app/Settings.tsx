import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />

      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <Text style={styles.text}>◉ Version: 1.0.0</Text>
        <Text style={styles.text}>◉ Developed by: LangMaster Team of MKR</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>◉ Enter text manually for analysis.</Text>
        <Text style={styles.text}>◉ Tap 'Analyze' to see the results.</Text>
        <Text style={styles.text}>◉ Use the Meaning feature to find Meaning of word.</Text>
        <Text style={styles.text}>◉ Use the Synonym feature to find Synonym of word.</Text>
        <Text style={styles.text}>◉ Use the Translation feature to Translate sentences.</Text>
        <Text style={styles.text}>◉ For more details, refer to the 'INPUT' section.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's New</Text>
        <Text style={styles.text}>◉ Faster word processing and response time.</Text>
        <Text style={styles.text}>◉ Improved translation accuracy.</Text>
        <Text style={styles.text}>◉ UI enhancements for a seamless experience.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'black', // Set background color to black
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: 'gold',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  sectionTitle: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  }
});

export default Settings;
