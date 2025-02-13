import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SettingsIcon = ({ color, size }: { color: string, size: number }) => {
  return (
    <View>
      <FontAwesome name="cog" size={size} color={color} />
    </View>
  );
};

export default SettingsIcon;
