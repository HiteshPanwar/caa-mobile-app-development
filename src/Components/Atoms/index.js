import React from 'react'
import { Image,TextInput , Text, View, TouchableOpacity, Modal,ImageBackground, ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

const AppbackgraoundImage = (props) => (
    <ImageBackground source={props.source} style={props.style}  {...props}>{props.children}</ImageBackground>)

const AppImage = (props) => (
    <Image resizeMode="contain"  source={props.source} style={[props.style]} {...props}/>)

const AppInput = (props) => (
    <TextInput style={[props.style]} {...props}  />
)

const AppText = (props) => (
    <Text {...props} style={[styles.defaultText, props.style]}>{props.children}</Text>)

const AppView = (props) => (
    <View style={props.style} {...props}>{props.children}</View>)

const Touchable = (props) => (
    <TouchableOpacity onPress={props.onPress} style={[props.style]}>{props.children}</TouchableOpacity>)

const TouchableIn = (props) => (
    <TouchableOpacity onPressIn={props.onPressIn} style={[props.style]}>{props.children}</TouchableOpacity>)

const AppModal = (props) => (
    <Modal  visible={props.visible} animationType={props.animationType || "slide"}  CancelModal={props.CancelModal} transparent={true} >{props.children}</Modal>)


const Indicator = (props) => (
    <ActivityIndicator {...props}/>)

const SilentTouchable = (props)=>(
    <TouchableWithoutFeedback {...props}/>
) 
const List = props =>(
    <FlatList
    {...props}
    />
)    

export {
    AppImage,
    AppText,
    AppView,
    Touchable,
    TouchableIn,
    AppModal,
    AppbackgraoundImage,
    Indicator,
    List,
    SilentTouchable,
    AppInput
}