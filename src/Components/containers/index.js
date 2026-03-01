import { AppView, } from "../Atoms/index"
import styles from "./styles"
import { Header,Footer } from '../molecules';
import {KeyboardAvoidingView,ScrollView,Platform} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react';

const Container = (props) => {
    // console.log("childre=>>",props)
    return (<AppView style={[props.style]}> 
        {props.custom}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "padding"} enabled >
                        <ScrollView
                        nestedScrollEnabled={true}
                            keyboardShouldPersistTaps={"handled"}
                            showsVerticalScrollIndicator={false}
                            >
                            {props.children}
                        </ScrollView>
                    </KeyboardAvoidingView>
                    </AppView>
    )
}

export { Container } 