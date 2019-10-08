import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import HumburgerMenu from './navigations/HumburgerMenu';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/Home';

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setReady(true);
  }, ready)
  return (
    ready != false ? (
      <>
        <StatusBar hidden />
        <HumburgerMenu />
      </>
    ) : null
  )
}


