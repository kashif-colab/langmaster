import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const InputIcon = ({ color, size }: { color: string, size: number }) => {
  return (
    <View>
      <FontAwesome name="keyboard-o" size={size} color={color} />
    </View>
  );
};

export default InputIcon;
