import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />

      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.text}>Dark Mode (only)</Text>
          <Switch value={true} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <Text style={styles.text}>• Version: 1.0.0</Text>
        <Text style={styles.text}>• Developed by: LangMaster Team of MKR</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>1. Enter text manually or use OCR/STT to capture input.</Text>
        <Text style={styles.text}>2. Tap 'Analyze' to see the analysis.</Text>
        <Text style={styles.text}>3. Use the Meaning, Synonym, and Translation features with More Option.</Text>
        <Text style={styles.text}>4. For more details, refer to the 'INPUT' section.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's New</Text>
        <Text style={styles.text}>• Improved OCR accuracy</Text>
        <Text style={styles.text}>• Faster Speech-to-Text conversion</Text>
        <Text style={styles.text}>• New language support added</Text>
        <Text style={styles.text}>• UI enhancements and bug fixes</Text>
      </View>
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'green',
    fontSize: 16,
    marginBottom: 5,
  }
});

export default Settings;
