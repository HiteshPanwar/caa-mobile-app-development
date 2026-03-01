import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage, AppInput } from "@Component/Atoms/index"
import { FlatList, SafeAreaView, ScrollView, Alert } from "react-native"
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
    rightArrow,
    StarIcon,
    starFilledIcon,
    mapMarker
} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import { CustomModal } from '@Component/molecules/index';
import style from '../ContactUs/style';
import ApiRequest from '../../RestAPI/rest'
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class MyLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerVisibleToggle: true,
            covidAlertStatus: true,
            mapListToggle: true,
            data: [true, true, true, true, true],
            ModalVisible: false,
            favList: [],
            favListUnfiltered:[],
            Searchresultstatus:false
        };
    }
    componentDidMount() {

       // this.getFavouriteList()
        this.props.navigation.addListener('focus', () => {
            this.getFavouriteList()
        });
    }


    handleCovidAlertStatus() {
        this.setState({ covidAlertStatus: !this.state.covidAlertStatus })
    }
    setMarkerRef = (ref) => {
        this.marker = ref
    }


    getFavouriteList() {

        this.setState({ isLoading: true })

        console.log("Alert==>", this.props.token)
        ApiRequest({}, "user-app/get-favorite-list", "GET", this.props.token)
            .then(async resp => {
                console.log("FavouriteList==>", resp)
                switch (resp.status) {
                    case (900): {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "Please check your internet connection",
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);
                        break;
                    }
                    case (200): {

                        this.setState({ isLoading: false, favList: resp.data.data ,favListUnfiltered:resp.data.data })
                        break;
                    }


                    default: {

                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert('',
                                'Please try again later',
                                //    resp.data.response_message,
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);

                    }
                        break;
                }

            })


    }
    addRemoveFavourite(item, index) {

        let details =
        {
            "name":  item.location.name,
            "place_id":  item.location.place_id,
            "address": item.location.address,
            "latitude": item.location.latitude,
            "longitude": item.location.longitude,
            "category": item.location.category
        }
        ApiRequest(details, "user-app/favorite", "POST", this.props.token)
            .then(async resp => {
                console.log("responseData==>", resp, details)
                switch (resp.status) {
                    case (900): {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "Please check your internet connection",
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);
                        break;
                    }
                    case (200): {
                            let tempFavList = []
                            
                            this.state.favList.forEach((estItem,estIndex)=>{
                                      if(estIndex!==index){
                                        tempFavList.push({...estItem})
                                      }
                            })

                            this.setState({favList:tempFavList})
                        this.setState({ ModalVisible: !this.state.ModalVisible })
                    }
                    break;
                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert('',
                                'Please try again later',
                                //    resp.data.response_message,
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        }, 200);

                    }
                        break;
                }

            })
    }
    handleFilter(text){
        this.setState({Searchresultstatus:false})
        if(text!==""){
        
        let searchedfavList = this.state.favListUnfiltered.filter(item=>(item.location.name.includes(text))?item:null)
        this.setState({ favList: searchedfavList})
        console.log("FilteredRestaurants======>", searchedfavList)
        if(searchedfavList.length===0){
            this.setState({Searchresultstatus:true})
        }
        console.log("value===>",text)
        }else{
        this.setState({ favList: this.state.favListUnfiltered})
        }
    }

    render() {
        const { MAP, LIST, M, ADDRESS_AREA } = this.props.COMMON_TEXT
        const { MYCAA } = this.props.MyCAAActivity
        return (

            <AppView style={{ flex: 1 }}>
                <Header />

                <AppView style={{ height: hp(70), marginBottom: this.state.footerVisibleToggle ? hp(10) : null }}>
                    <AppView style={styles.InputContainer}>

                        <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.InputWrapper}>
                            <AppText style={styles.buttonText}>
                                {"My Alerts"}
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

                    {

                        <AppView style={styles.scrollViewContainer}>
                            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                 
                                {this.state.favList.map((item, index) => {
                                    let AlertStatusIcon = whiteIcon
                                    let AlertText = ""
                                    switch (item.location.covid_status) {
                                        case "SAFE":
                                            AlertStatusIcon = safeIcon
                                            AlertText = "S"
                                            break;
                                        case "ALERT":
                                            AlertStatusIcon = alertIcon
                                            AlertText = "A"
                                            break;
                                        case "Partial Safe":
                                            AlertStatusIcon = partialIcon
                                            AlertText = "P"
                                            break;
                                        default:
                                            AlertStatusIcon = whiteIcon
                                            AlertText = ""
                                    }
                                    return (

                                        <AppView style={styles.cardViewContainer}>
                                            <Touchable onPress={() => this.addRemoveFavourite(item, index)} style={{ justifyContent: 'center', }}>
                                                <AppView style={styles.iconWrapper}>
                                                    <AppImage source={item ? starFilledIcon : StarIcon} resizeMode="contain" style={styles.iconStyle} />
                                                </AppView>
                                            </Touchable>
                                            <Touchable style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, }} onPress={() => {
                                                 this.props.navigation.navigate("PlaceView",{
                                                    
                                                        address: item.location.address,
                                                        title: item.location.name,
                                                        alertStatus: item.covid_status,
                                                        alertStatusText: AlertText,
                                                        AlertStatusIcon:AlertStatusIcon,
                                                        place_id: item.location.place_id,
                                                        latitude: item.location.latitude, 
                                                        longitude: item.location.longitude,
                                                        category:item.location.category
                                                      
                                                 })
                                            }

                                            }>
                                                <AppView style={{ flexDirection: 'row', }}>
                                                    <AppView style={styles.iconWrapper}>
                                                        <AppbackgraoundImage source={AlertStatusIcon} resizeMode="contain" style={styles.iconStyle}>
                                                            <AppText style={styles.iconText}>
                                                                {AlertText}
                                                            </AppText>
                                                        </AppbackgraoundImage>
                                                    </AppView>
                                                    <AppView style={styles.establishmentName}>
                                                        <AppView>
                                                            <AppText style={[styles.establishmentText]}>
                                                                {item.location.name}
                                                            </AppText>
                                                        </AppView>
                                                        <AppView>
                                                            <AppText style={styles.estDistanceText}>
                                                                {item.location.address}
                                                            </AppText>
                                                        </AppView>
                                                    </AppView>
                                                </AppView>
                                                <AppView style={styles.iconWrapper}>
                                                    <AppImage source={rightArrow} resizeMode="contain" style={{ height: hp(2), width: wp(4) }} />
                                                </AppView>
                                            </Touchable>
                                        </AppView>
                                    )
                                }


                                )
                                }
                            </ScrollView>
                        </AppView>

                    }
                    <CustomModal
                        isModalVisible={this.state.ModalVisible}
                        onPress={() => this.setState({ ModalVisible: !this.state.ModalVisible })}
                        text={"Location has been removed"}
                    />

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

export default connect(mapStateToProps)(MyLocation);