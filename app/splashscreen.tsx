// app/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const video = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 10000); // 10 seconds duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('./images/INTRO.mp4')} // File path for the video
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER} // Correct way to set resizeMode
        shouldPlay
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
