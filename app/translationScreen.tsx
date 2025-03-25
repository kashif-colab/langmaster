import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

const TranslationScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [inputLang, setInputLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const navigation = useNavigation();

  const fetchTranslation = async () => {
    setError('');
    setTranslatedText('');
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLang}|${targetLang}`);
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError('Translation not found');
      }
    } catch (err) {
      setError('Error fetching translation');
    }
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(translatedText);
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'black', padding: 20, alignItems: 'center' }}>
      <Image source={require('./images/gg.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
      <Text style={{ color: 'gold', fontSize: 24, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>Translation</Text>
      <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', marginBottom: 10 }}>Select input and output languages, then enter text to translate.</Text>
      
      <Picker
        selectedValue={inputLang}
        style={{ height: 50, width: '80%', color: 'white', backgroundColor: '#222', marginBottom: 10, borderRadius: 5 }}
        onValueChange={(itemValue) => setInputLang(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Urdu" value="ur" />
        <Picker.Item label="Kannada" value="kn" />
        <Picker.Item label="Tamil" value="ta" />
        <Picker.Item label="Telugu" value="te" />
        <Picker.Item label="Marathi" value="mr" />
        <Picker.Item label="Bengali" value="bn" />
        <Picker.Item label="Gujarati" value="gu" />
        <Picker.Item label="Malayalam" value="ml" />
        <Picker.Item label="Punjabi" value="pa" />
      </Picker>
      
      <TextInput
        style={{ backgroundColor: 'white', color: 'black', padding: 10, borderRadius: 5, marginBottom: 10, width: '80%', textAlign: 'center' }}
        placeholder="Enter text"
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
      />
      
      <Picker
        selectedValue={targetLang}
        style={{ height: 50, width: '80%', color: 'white', backgroundColor: '#222', marginBottom: 10, borderRadius: 5 }}
        onValueChange={(itemValue) => setTargetLang(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Urdu" value="ur" />
        <Picker.Item label="Kannada" value="kn" />
        <Picker.Item label="Tamil" value="ta" />
        <Picker.Item label="Telugu" value="te" />
        <Picker.Item label="Marathi" value="mr" />
        <Picker.Item label="Bengali" value="bn" />
        <Picker.Item label="Gujarati" value="gu" />
        <Picker.Item label="Malayalam" value="ml" />
        <Picker.Item label="Punjabi" value="pa" />
      </Picker>
      
      <CustomButton title="Translate" onPress={fetchTranslation} style={{ width: '50%', alignSelf: 'center', marginBottom: 10 }} />
      
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{error}</Text> : null}
      
      {translatedText ? (
        <View style={{ marginTop: 10, width: '90%', backgroundColor: '#222', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Translated Text</Text>
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 5 }}>{translatedText}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={{ marginTop: 10, alignSelf: 'center', backgroundColor: 'gold', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Copy to Clipboard</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      
      <CustomButton title="Back" onPress={() => navigation.goBack()} style={{ marginTop: 20, width: '50%' }} />
    </ScrollView>
  );
};

export default TranslationScreen;