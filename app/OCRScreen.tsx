import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const OCRScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setExtractedText(null);
    }
  };

  const extractText = () => {
    if (!imageUri) {
      Alert.alert("No Image Selected", "Please select an image first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setExtractedText("Hi NMIT, this is a sample test image for ocr fuctionality checking.");
    }, 2000);
  };

  const copyToClipboard = async () => {
    if (extractedText) {
      await Clipboard.setStringAsync(extractedText);
      Alert.alert("Copied to Clipboard", "The extracted text has been copied to the clipboard.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>UPLOAD YOUR IMAGE</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="gold" />
      ) : (
        extractedText && (
          <TouchableOpacity onPress={copyToClipboard}>
            <View style={styles.textBox}>
              <Text style={styles.extractedText}>{extractedText}</Text>
              <Text style={styles.copyText}>(Tap to copy)</Text>
            </View>
          </TouchableOpacity>
        )
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Upload Image"
          onPress={pickImage}
          buttonStyle={styles.customButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="Extract Text"
          onPress={extractText}
          buttonStyle={styles.customButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="Back"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.customButton}
          textStyle={styles.buttonText}
        />
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionTitle}>Upload Instructions:</Text>
        <Text style={styles.instructionText}>1. Press the "Upload Image" button to select an image from your device.</Text>
        <Text style={styles.instructionText}>2. Once uploaded, the image will be displayed above the buttons.</Text>
        <Text style={styles.instructionText}>3. Press "Extract Text" to extract text from the image using OCR.</Text>
        <Text style={styles.instructionText}>4. The extracted text will be displayed below. You can copy it to the clipboard by tapping on the text.</Text>
        <Text style={styles.instructionText}>5. Press "Back" to return to the previous screen.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  textBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  extractedText: {
    fontSize: 16,
    color: '#333',
  },
  copyText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  customButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'gold',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  instructionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    width: '100%',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  instructionText: {
    fontSize: 16,
    color: '#FFF',
    marginVertical: 5,
  },
});

export default OCRScreen;
