import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SynonymScreen = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const fetchSynonyms = async () => {
    setError('');
    setSynonyms([]);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      if (data.title) {
        setError('No synonyms found');
      } else {
        const syns: string[] = [];
        data.forEach((entry: any) => {
          entry.meanings.forEach((meaning: any) => {
            if (meaning.synonyms) {
              syns.push(...meaning.synonyms);
            }
          });
        });
        setSynonyms(syns.length > 0 ? syns : ['No synonyms found']);
      }
    } catch (err) {
      setError('Error fetching synonyms');
    }
  };

  const copyToClipboard = async () => {
    if (synonyms.length > 0) {
      await Clipboard.setStringAsync(synonyms.join(', '));
      Alert.alert('Copied!', 'Synonyms copied to clipboard.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'black', padding: 20, alignItems: 'center' }}>
      <Image source={require('./images/gg.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />

      <Text style={{ color: 'gold', fontSize: 24, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>
        Synonyms Finder
      </Text>

      <TextInput
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          width: '80%',
          textAlign: 'center',
        }}
        placeholder="Enter word"
        placeholderTextColor="gray"
        value={word}
        onChangeText={setWord}
      />

      <CustomButton title="Find Synonyms" onPress={fetchSynonyms} style={{ width: '50%', alignSelf: 'center', marginBottom: 20 }} />

      {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{error}</Text> : null}

      <View style={{ width: '90%', backgroundColor: '#222', padding: 15, borderRadius: 10, minHeight: 150 }}>
        <ScrollView style={{ maxHeight: 300 }}>
          {synonyms.length > 0 && (
            <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
              Synonyms
            </Text>
          )}

          {synonyms.map((syn, index) => (
            <Text
              key={index}
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                marginVertical: 5,
                padding: 5,
                borderBottomWidth: 1,
                borderBottomColor: 'gold',
              }}>
              {syn}
            </Text>
          ))}
        </ScrollView>
      </View>

      <CustomButton title="Copy to Clipboard" onPress={copyToClipboard} style={{ width: '50%', alignSelf: 'center', marginTop: 20, backgroundColor: 'blue' }} />
      <CustomButton title="Back" onPress={() => navigation.goBack()} style={{ width: '50%', alignSelf: 'center', marginTop: 10, backgroundColor: 'gray' }} />
    </ScrollView>
  );
};

export default SynonymScreen;
