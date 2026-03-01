import React, { Component } from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { RED_BG_THEME} from '@GlobalStyles/colors';
import {Loader} from "../../Components/loader"
import { AppView, AppText, Touchable } from '../../Components/Atoms';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default class Browser extends Component {

  LoadingIndicatorView() {
    return <Loader
      visible={true}
    />  
  }

  render() {
    return(
    
    <AppView style={{flex:1}}>
      <AppView  style={{height:hp(7),width:wp(100),backgroundColor: 'white',justifyContent: 'center',}}  >
        <Touchable onPress={()=>this.props.navigation.goBack()}>
        <AppText style={{color:'black',marginLeft: wp(2),}}>{"< Back"}</AppText>
        </Touchable>
      </AppView>
      <WebView source={{ uri: this.props.route.params.Link }} style={{ marginTop: 1 }}
                       renderLoading={this.LoadingIndicatorView}
                      startInLoadingState={true}  />
    </AppView>

    )  
             
  }
}
