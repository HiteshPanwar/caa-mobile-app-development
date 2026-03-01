import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage,AppInput } from "@Component/Atoms/index"
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { Header, Footer, SubmitButton ,BoxIcon} from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import {fontStyle} from '@Assets/commonFont/commonFont'
import styles from './styles'
import DefaultState from "../constant"
import {  DARKBLUE } from "@GlobalStyles/colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { backArrow } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { normalizeFont } from '@GlobalStyles/responsive';


class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            footerVisibleToggle:true,
            continueState:false
        };
    }

    render(){
        const {THE_PUBLIC,WORKERS,NO} =this.props.CommonReport

        return(
            <AppView style={{ flexDirection: "row", justifyContent: "space-between",marginTop:hp(2),marginLeft:wp(0) }}>
            <AppView>
            <BoxIcon
                onPress={this.props.toggle1}
                state={this.props.state}
            />
             <AppText style={styles.textWrapper}>
               {THE_PUBLIC}
           </AppText>
           </AppView>  
            <AppView style={{marginLeft:wp(5)}}>
                <BoxIcon
                     onPress={this.props.toggle2}
                state={this.props.state}
                />
                 <AppText style={[styles.textWrapper]}>
               {WORKERS}
           </AppText>
            </AppView>
            <AppView style={{marginLeft:wp(5)}}>
                <BoxIcon
                     onPress={this.props.toggle3}
                    state={this.props.state}
                />
                  <AppText style={[styles.textWrapper,]}>
               {NO}
           </AppText>
            </AppView>
        </AppView>

        )

        }


    }   
        const mapStateToProps = state => {
            console.log("state==>>", state.reducer.language)
            return {
                CommonReport:state.reducer.language.COMMON_REPORT,
                CommonText:state.reducer.language.COMMON_TEXT,
                Employee:state.reducer.language.Employee
               
            }
        }
        export default connect(mapStateToProps)(Options);