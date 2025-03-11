import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const STTScreen = () => {
  const navigation = useNavigation();
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
        setFileUri(result.uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick file');
    }
    startTranscription();
  };

  const startTranscription = async () => {
    setIsTranscribing(true);
    setLoading(true);
    setTimeout(() => {
      setText("Hello this is Kashif, I am testing the speech to text functionality.");
      setIsTranscribing(false);
      setLoading(false);
    }, 10000);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('./images/gg.png')} style={styles.logo} />
      <Text style={styles.title}>UPLOAD YOUR AUDIO FILE</Text>
      <ScrollView style={styles.textBox}>
        <TextInput 
          style={styles.input} 
          value={text} 
          editable={false} 
          multiline 
          placeholder="Transcribed text will appear here"
          selectTextOnFocus={true} 
        />
      </ScrollView>
      <CustomButton title="Upload File" onPress={pickFile} />
      {fileUri && <Text style={styles.audioFileText}>File Uploaded: {fileUri}</Text>}
      <CustomButton title="Transcribe" onPress={startTranscription} disabled={isTranscribing} />
      {isTranscribing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Transcribing...</Text>
        </View>
      )}
      {loading && !isTranscribing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Processing...</Text>
        </View>
      )}
      <CustomButton title="Back" onPress={handleBackButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#000' },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#FFD700' },
  audioFileText: { marginTop: 10, fontSize: 16, color: '#FFD700' },
  textBox: { width: '100%', marginBottom: 10 },
  input: { height: 200, borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 18, color: '#FFF', textAlignVertical: 'top', backgroundColor: '#222' },
  loadingContainer: { marginTop: 20, justifyContent: 'center', alignItems: 'center' }
});

export default STTScreen;
