if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, AsyncStorage , I18nManager} from 'react-native';
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
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    setReady(true);
  }
  useEffect(() => {
    loadFonts();
    AsyncStorage.getItem('token').then(data => {
      if (data != null) {
        NotificationModule();
      }
    });

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


