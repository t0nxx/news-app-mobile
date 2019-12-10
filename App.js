if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Notifications } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from 'native-base';
import { AuthProvider } from './services/auth';
import NotificationModule from './Notifications';
import HumburgerMenu from './navigations/HumburgerMenu';

export default function App(props) {
  const [ready, setReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Cairo: require('./assets/fonts/Cairo-Regular.ttf'),
      ...Ionicons.font,
    });
    setReady(true);
  }
  useEffect(() => {
    loadFonts();
    NotificationModule();
  }, ready)
  return (
    ready != false ? (
      <>
        <Root>
          <AuthProvider>
            <StatusBar barStyle="default" />
            <HumburgerMenu />
          </AuthProvider>
        </Root>

      </>
    ) : null
  )
}


