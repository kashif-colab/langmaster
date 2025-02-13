import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeIcon = ({ color, size }: { color: string, size: number }) => {
  return (
    <View>
      <FontAwesome name="home" size={size} color={color} />
    </View>
  );
};

export default HomeIcon;
