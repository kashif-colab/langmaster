import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';

const TranslationScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [targetLang, setTargetLang] = useState('hi');

  const fetchTranslation = async () => {
    setError('');
    setTranslatedText('');
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${targetLang}`);
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

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20, borderColor: 'gold', borderWidth: 2, alignItems: 'center' }}>
      <Image source={require('./images/gg.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
      <Text style={{ color: 'gold', fontSize: 24, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>Translation</Text>
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
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Urdu" value="ur" />
        <Picker.Item label="Kannada" value="kn" />
        <Picker.Item label="English" value="en" />
      </Picker>
      <CustomButton title="Translate" onPress={fetchTranslation} style={{ width: '50%', alignSelf: 'center', marginBottom: 20 }} />
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{error}</Text> : null}
      <ScrollView style={{ marginTop: 10, width: '90%', backgroundColor: '#222', padding: 15, borderRadius: 10 }}>
        {translatedText ? (
          <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Translated Text</Text>
        ) : null}
        {translatedText ? (
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 5 }}>{translatedText}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default TranslationScreen;
