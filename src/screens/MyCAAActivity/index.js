import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage, AppInput } from "@Component/Atoms/index"
import { FlatList, SafeAreaView, ScrollView,Alert } from "react-native"
import { Header, Footer } from '@Component/molecules/index';
import { GREY_TEXT } from './color'
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    blueBarIconWhiteBorder,
    searchIcon,
    caaIcon,
    smallDarkBlueBar,
    smallBlueWhiteBorder,
    alertIcon,
    partialIcon,
    safeIcon,
    whiteIcon,
    mapMarker
} from '@Assets/Icon'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import style from '../ContactUs/style';
import ApiRequest from '../../RestAPI/rest';
import firebase from '../../firebase/firebase';
import AsyncStorage from '@react-native-community/async-storage';
var database = firebase.database(); 
class MyCAAActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerVisibleToggle: true,
            data: [1, 2, 3, 4, 5],
            establishliadhmentList: [],
            establishliashmentListUnfiltered:[],
            Searchresultstatus:false
        };
    }
    componentDidMount() {  
        this.props.navigation.addListener('focus', () => {
            this.getListEstablishment()
        });
    }


    getListEstablishment() {

        this.getProfileDetails().then(async(rootUserDetails)=>{
console.log('mycaaactivity',rootUserDetails.reviews)
 this.setState({ isLoading: false, establishliadhmentList: rootUserDetails.reviews,establishliashmentListUnfiltered:rootUserDetails.reviews })
        });




        // ApiRequest({}, "user-app/my-caa-activity", "GET", this.props.token)
        //     .then(async resp => {
        //         console.log("getListEstablishment==>", resp)
        //         switch (resp.status) {
        //             case (900): {
        //                 this.setState({ isLoading: false })
        //                 setTimeout(() => {
        //                     Alert.alert(
        //                         '',
        //                         "Please check your internet connection",
        //                         [
        //                             { text: 'OK', onPress: () => console.log('OK Pressed') },
        //                         ],
        //                         { cancelable: false },
        //                     );
        //                 }, 200);
        //                 break;
        //             }
        //             case (200): {
        //                 this.setState({ isLoading: false, establishliadhmentList: resp.data.data,establishliashmentListUnfiltered:resp.data.data })
        //                 break;
        //             }
        //             default: {
        //                 this.setState({ isLoading: false })
        //                 setTimeout(() => {
        //                     Alert.alert('',
        //                     'Please try again later',
        //                         //    resp.data.response_message,
        //                         [
        //                             { text: 'OK', onPress: () => console.log('OK Pressed') },
        //                         ],
        //                         { cancelable: false },
        //                     );
        //                 }, 200);
        //             }
        //                 break;
        //         }
        //     })
    }

    getProfileDetails = async () => {
        return new Promise(resolve => {
     
        AsyncStorage.getItem("LOGIN_CREDENTIALS").then(async (resp) => {
            if (JSON.parse(resp) !== null) {
                
        database.ref().child('users').orderByChild('mobile').equalTo(JSON.parse(resp).mobile).on("value", function(snapshot) {
            snapshot.forEach( function(data) {
                resolve(data.val())
            });
        });
    }
    });  })
    }
    handleFilter(text){
        this.setState({Searchresultstatus:false})
        if(text!==""){
        
        let searchedEstablishlishmentList = this.state.establishliashmentListUnfiltered.filter(item=>(item.data.location.name.includes(text))?item:null)
        this.setState({ establishliadhmentList: searchedEstablishlishmentList})
        console.log("FilteredRestaurants======>", searchedEstablishlishmentList)
        if(searchedEstablishlishmentList.length===0){
            this.setState({Searchresultstatus:true})
        }
        console.log("value===>",text)
        }else{
        this.setState({ establishliadhmentList: this.state.establishliashmentListUnfiltered})
        }
    }
    dateHandler(dateItem) {
        const d = new Date(dateItem);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const a = d.getDate()
        const b = months[d.getMonth()]
        const c = d.getFullYear()
        const e = a + " " + b + ", " + c
        console.log(e)
        return (e)
    }

    renderEstablishment(item,index){
             let dateConverted = this.dateHandler(item.time)

            return (
                <AppView style={styles.cardViewContainer}>
                    {/* <AppView style={styles.iconWrapper}>
                        <AppbackgraoundImage source={AlertStatusIcon} resizeMode="contain" style={styles.iconStyle}>
                            <AppText style={styles.iconText}>
                                {AlertText}
                            </AppText>
                        </AppbackgraoundImage>
                    </AppView> */}
                    <AppView style={styles.establishmentName}>
                        <AppView>
                            <AppText style={styles.establishmentText}>
                                {item.data.location.name}
                            </AppText>
                        </AppView>
                        <AppView>
                            <AppText style={styles.estDistanceText}>
                                {item.data.location.address}
                        </AppText>
                        </AppView>
                    </AppView>
                    <AppView style={styles.dateTimeContainer}>
                        <AppView>
                            <AppText style={styles.dateTimeText}>
                                Reported On
                           </AppText>
                        </AppView>
                        <AppView>
                            <AppText style={styles.dateTimeText}>
                                {dateConverted}
                           </AppText>
                        </AppView>
                    </AppView>
                </AppView>
            )
    }
    render() {
        const { MAP, LIST, M, ADDRESS_AREA } = this.props.COMMON_TEXT
        const { MYCAA } = this.props.MyCAAActivity
        return (
            <AppView style={{ flex: 1 }}>
                <Header />
                <AppView style={{ height:hp(79) , marginBottom: this.state.footerVisibleToggle ? hp(28.75) : null }}>
                    <AppView style={styles.InputContainer}>
                        <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.InputWrapper}>
                            <AppText style={styles.buttonText}>
                                {MYCAA}
                            </AppText>
                        </AppbackgraoundImage>
                    </AppView>
                    <AppView style={styles.searchContainer}>
                        <AppImage source={searchIcon} style={styles.searchIcon} />
                        <AppInput
                            onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                            onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                            onChangeText={(text)=>{this.handleFilter(text)}}
                            placeholder={ADDRESS_AREA} style={styles.InputStyle} placeholderTextColor={GREY_TEXT} />
                        <AppImage source={caaIcon} style={styles.caaIcon} />
                    </AppView>
                        <AppView style={styles.scrollViewContainer}>
                            <FlatList
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                             data={this.state.establishliadhmentList}
                             renderItem={({ item, index }) => this.renderEstablishment(item,index)}
                             keyExtractor={(item) => item.id}
                            />
                        </AppView>
                </AppView>
                {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
            </AppView>
        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        MyCAAActivity: state.reducer.language.MyCAAActivity,
        COMMON_TEXT: state.reducer.language.COMMON_TEXT,
        token: state.AuthReducer.Token
    }
}

export default connect(mapStateToProps)(MyCAAActivity);