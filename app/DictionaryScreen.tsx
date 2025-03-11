import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
import CustomButton from "../components/CustomButton";

const DictionaryScreen = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchDefinition = async () => {
    if (!word.trim()) return;
    setError("");
    setResult(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setResult(data[0]);
      } else {
        setError("Word not found.");
      }
    } catch (err) {
      setError("Error fetching definition.");
    }
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: "black", 
      padding: 20, 
      borderColor: "gold", 
      borderWidth: 2, 
      alignItems: "center" 
    }}>
      <Image source={require("./images/gg.png")} style={{ width: 100, height: 100, marginBottom: 10 }} />
      
      <Text style={{ 
        color: "gold", 
        fontSize: 24, 
        textAlign: "center", 
        marginVertical: 10, 
        fontWeight: "bold" 
      }}>
        Find Meanings
      </Text>

      <TextInput
        style={{ 
          backgroundColor: "white", 
          color: "black", 
          padding: 10, 
          borderRadius: 5, 
          marginBottom: 10, 
          width: "80%", 
          textAlign: "center" 
        }}
        placeholder="Enter a word"
        placeholderTextColor="gray"
        value={word}
        onChangeText={setWord}
      />

      <CustomButton title="Search" onPress={fetchDefinition} style={{ width: "50%", alignSelf: "center", marginBottom: 20 }} />

      {error ? <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{error}</Text> : null}

      {result && (
        <ScrollView style={{ 
          marginTop: 10, 
          width: "90%", 
          backgroundColor: "#222", 
          padding: 15, 
          borderRadius: 10 
        }}>
          <Text style={{ color: "gold", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            {result.word}
          </Text>

          {result.meanings.map((meaning: any, index: number) => (
            <View key={index} style={{ marginTop: 10 }}>
              <Text style={{ color: "gold", fontSize: 18 }}>{meaning.partOfSpeech}</Text>
              {meaning.definitions.map((def: any, i: number) => (
                <Text key={i} style={{ 
                  color: "white", 
                  marginLeft: 10, 
                  padding: 5, 
                  borderBottomWidth: 1, 
                  borderBottomColor: "gold" 
                }}>
                  - {def.definition}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DictionaryScreen;
