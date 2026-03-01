
// export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import { Header, Footer } from '@Component/molecules/index'
import WebViewExample  from "./src/screens/LoginScreen/WebView"
 import Navigation from './src/router/Navigation'
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import { Alert } from 'react-native';
const App = () => {
  useEffect(() => {
    SplashScreen.hide()
    checkPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


    const checkPermission =() => {
     messaging().hasPermission()
     .then(enabled =>{
      console.log("enabled", enabled)
      if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
     }).catch(error =>{
       console.log("FCMTOKEN==<<",error)
     })
    
    }
    const getToken = async () => {
     
         messaging().getToken()
         .then(async (fcmToken)  =>{
           console.log("FCMTOKEN==>>",fcmToken)
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
          
         })
        
    }






  
    const requestPermission = () => {
      try {
          messaging().requestPermission();
          // User has authorised
          getToken();
      } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
      }
    }
  return (
         
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation/>
    </SafeAreaView>


  );
}


export default App;