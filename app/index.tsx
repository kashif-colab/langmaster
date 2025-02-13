import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './splashscreen';
import Home from './Home';
import Input from './Input';
import More from './More';
import Settings from './Settings';
import HomeIcon from './tabs/HomeIcon';
import InputIcon from './tabs/InputIcon';
import SettingsIcon from './tabs/SettingsIcon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Input Stack without OCR Screen
const InputStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InputMain" component={Input} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};

export default function Index() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'black',
        },
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Input"
        component={InputStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <InputIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
