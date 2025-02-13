import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Input = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [wrongWords, setWrongWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const excludedWords = ['Kashif', 'Ali']; // Names to ignore

  const analyzeText = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(inputText)}&language=en-US`,
      });
      const data = await response.json();

      let corrected = inputText;
      let incorrectWords = [];

      data.matches.forEach((match) => {
        const incorrectWord = corrected.substring(match.offset, match.offset + match.length);

        // Skip checking for excluded words
        if (excludedWords.some((name) => incorrectWord.includes(name))) {
          return;
        }

        incorrectWords.push({
          word: incorrectWord,
          suggestions: match.replacements.map((r) => r.value),
        });

        // Apply the first suggestion as the correction
        if (match.replacements.length > 0) {
          corrected = corrected.slice(0, match.offset) + match.replacements[0].value + corrected.slice(match.offset + match.length);
        }
      });

      setCorrectedText(corrected);
      setWrongWords(incorrectWords);
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to show alert for unavailable features
  const showUnavailableAlert = () => {
    Alert.alert(
      'Unavailable Feature',
      'This feature is currently unavailable at the moment.',
      [{ text: 'OK', style: 'cancel' }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />

      <Text style={styles.selectText}>Select Input Method</Text>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={showUnavailableAlert}>
          <Image source={require('./images/O.png')} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your text here"
          placeholderTextColor="gray"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        <TouchableOpacity style={styles.iconButton} onPress={showUnavailableAlert}>
          <Image source={require('./images/STT.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.analyzeButton} onPress={analyzeText}>
        <Text style={styles.buttonText}>Analyze</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="gold" />}

      {correctedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.correctedText}>Corrected Sentence:</Text>
          <Text style={styles.outputText}>{correctedText}</Text>

          {wrongWords.length > 0 && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Incorrect Words:</Text>
              {wrongWords.map((item, index) => (
                <Text key={index} style={styles.errorText}>
                  {item.word}: {item.suggestions.join(', ')}
                </Text>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.moreButton} onPress={() => navigation.navigate('More')}>
            <Text style={styles.buttonText}>More</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  selectText: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  iconButton: {
    backgroundColor: 'gold',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gold',
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'gold',
  },
  analyzeButton: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  resultContainer: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  correctedText: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  outputText: {
    color: 'gold',
    fontSize: 18,
    marginBottom: 10,
  },
  errorContainer: {
    marginTop: 10,
  },
  errorTitle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  errorText: {
    color: 'orange',
    fontSize: 16,
  },
  moreButton: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
});

export default Input;
