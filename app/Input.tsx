import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, ActivityIndicator, Clipboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const Input = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [wrongWords, setWrongWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const excludedWords = ['Kashif', 'Ali'];

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
      let wordSuggestions = [];

      data.matches.forEach((match) => {
        const incorrectWord = corrected.substring(match.offset, match.offset + match.length);
        if (excludedWords.some((name) => incorrectWord.includes(name))) return;

        incorrectWords.push(incorrectWord);
        wordSuggestions.push(match.replacements.map((r) => r.value).join(', '));

        if (match.replacements.length > 0) {
          corrected = corrected.slice(0, match.offset) + match.replacements[0].value + corrected.slice(match.offset + match.length);
        }
      });

      setCorrectedText(corrected);
      setWrongWords(incorrectWords);
      setSuggestions(wordSuggestions);
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(correctedText);
    alert('Text copied to clipboard!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />
      <Text style={styles.selectText}>Enter Your Text</Text>

      <View style={styles.inputContainer}>
        <ScrollView style={styles.inputScroll} nestedScrollEnabled>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor="gray"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
        </ScrollView>
      </View>

      <CustomButton title="Analyze" onPress={analyzeText} style={styles.analyzeButton} loading={loading} />
      <CustomButton title="More" onPress={() => navigation.navigate('More')} style={styles.moreButton} />

      {loading && <ActivityIndicator size="large" color="gold" />}

      {correctedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.correctedText}>Corrected Sentence:</Text>
          <Text style={styles.outputText}>{correctedText}</Text>

          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>

          {wrongWords.length > 0 && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Incorrect Words:</Text>
              {wrongWords.map((word, index) => (
                <View key={index} style={styles.wordBox}>
                  <Text style={styles.wordText}>{word}</Text>
                </View>
              ))}
              <Text style={styles.errorTitle}>Suggestions:</Text>
              {suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionBox}>
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>
          )}
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  selectText: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: 'gold',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  inputScroll: {
    flex: 1,
  },
  input: {
    fontSize: 18,
    color: 'black',
    textAlignVertical: 'top',
  },
  analyzeButton: {
    marginTop: 10,
    width: '100%',
  },
  moreButton: {
    marginTop: 10,
    width: '100%',
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
  copyButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  copyButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
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
  wordBox: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  wordText: {
    color: 'white',
    fontSize: 16,
  },
  suggestionBox: {
    backgroundColor: 'orange',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  suggestionText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Input;
