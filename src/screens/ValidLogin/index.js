import React ,{ useState, useEffect }from "react"
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"

export default  ValidLogin = (props) => {
    useEffect(()=>{
        
        AsyncStorage.getItem("Token").then(resp => {
            console.log("Token",JSON.parse(resp))
              if (resp != null) {
               
                  props.navigation.navigate('Drawer')
              }
              else {
               
                  props.navigation.navigate('Login')
              }
          })


   },[]) 
      return (
        <View>
        </View>
      );
    
  }
