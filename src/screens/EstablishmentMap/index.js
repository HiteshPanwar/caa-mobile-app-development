import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage, AppInput } from "@Component/Atoms"
import { KeyboardAvoidingView, ScrollView, FlatList, Platform, ToastAndroid, Alert, Animated, Image, Easing } from 'react-native'
import { RED_BG_THEME, WHITE, FOOTER_BG, BLACK, BLUE_BAR } from '@GlobalStyles/colors';
import { Header, Footer } from '@Component/molecules';
import { GREY_TEXT } from './color'
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { CategoryModal } from "./categoryModal";
import ApiRequest from '../../RestAPI/rest';
import Hotspots from '../Hotspots/index';
import {
    blueBarIconWhiteBorder, searchIcon, caaIcon, smallDarkBlueBar,
    smallBlueWhiteBorder, alertIcon, partialIcon, safeIcon, whiteIcon,
    alertSelectedCircle, alertUnselectedCircle, rightArrow, refreshMarker,
    mapMarker, dropDownWhiteArrow, alertMarker, crossIcon,
    partialMarker, safeMarker, whiteMarker, hotspotIcon, listIcon, mapIcon
} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import style from '../ContactUs/style';
import { Loader } from "@Component/loader";
import { CategoryList } from './constants';
import firebase from '../../firebase/firebase';
var database = firebase.database(); 

const key = "AIzaSyC1MUcfavhcz08tL5oNHckMOmvzQ3bXeps"
const type = "restaurant"
const mapRef = React.createRef();
class EstablishmentMap extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            isLoading: true,
            footerVisibleToggle: true,
            mapListToggle: true,
            searchInputText: "",
            data: [1, 2, 3, 4, 5],
            suggestionArray: [],
            suggestionVisible: false,
            modalVisibleCategory: false,
            selectedMarkerIndex: null,
            categoryName: '',
            categoryList: CategoryList,
            type: "",
            renderMarkersArray: [],
            latitude: 37.0902,
            longitude: -95.7129,
            myLatitude: "",
            myLongitude: "",
            currentFocusScreenLat: "",
            currentFocusScreenLong: "",
            radius: "5000",
            onChangeCompleteFirstTimeStatus: false,
            updateRegion: true,
            onSubmitEditingStatus: false,
            selectedMarkerStatus: false,

        };
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
        // alert(hasLocationPermission)
        if (!hasLocationPermission) return;

        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                async (position) => {

                    this.state.mapRef.current.animateToRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0321
                    }, 2000)

                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        myLatitude: position.coords.latitude,
                        myLongitude: position.coords.longitude,
                        currentFocusScreenLat: position.coords.latitude,
                        currentFocusScreenLong: position.coords.longitude,
                    })

                    this.handleNearMeMarkersApi(position.coords.latitude, position.coords.longitude)

                    //   await this.setState({ mapRegion:obj ,  loading: false });
                    //   console.log("position===>", position);
                    //   console.log("position===>", this.state.longitude);
                    console.log("position===>", position);
                    // //   console.log("position===>",position.coords.latitude);
                    // this.getDistanceOneToOne()
                },
                (error) => {
                    this.setState({ location: error, loading: false });
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
            );
        });
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({ mapRef: mapRef }, () => this.getLocation())
        });

        // this.setState({ mapRef: mapRef }, () => this.getLocation())
        // this.setState({ mapRef: mapRef,isLoading:false }) //remove this

    }




    handleCovidAlertStatus() {
        this.setState({ mapListToggle: !this.state.mapListToggle })
    }


    regionChanged(region) {
        // setTimeout(() => {
        //     if(!this.state.onSubmitEditingStatus){
        //         if(this.state.onChangeCompleteFirstTimeStatus&&this.state.updateRegion){
        //             console.log(region)
        //                this.handleNearMeMarkersApi(region.latitude, region.longitude)
        //         }else if(this.state.onChangeCompleteFirstTimeStatus){
        //               this.setState({updateRegion:true})
        //         }   
        //     }

        // }, 2000);
        this.setState({ currentFocusScreenLat: region.latitude, currentFocusScreenLong: region.longitude })


    }

    handleAutoSearch(text) {
        this.setState({ searchInputText: text })
        // console.log(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=${key}&input=${text.length}`)
        // if (text.length !== 0) {
        //     var init = {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': "application/json",
        //         }
        //     }
        //     fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=${key}&input=${text}`, init)
        //         .then(res => res.json()
        //             .then(data => {
        //                 var apiData = {
        //                     status: res.status,
        //                     data: data
        //                 }
        //                 console.log(`API DATA==>`, apiData)
        //                 if (this.state.searchInputText.length !== 0) {
        //                     this.setState({ suggestionArray: apiData.data.predictions, suggestionVisible: true })
        //                 }
        //             }))
        //         .catch(err => {
        //             console.log("API ERR ->", err)
        //             var apiData = {
        //                 status: 900,
        //                 data: "please check your internet connection"
        //             }
        //         });
        // } else {
        //     this.setState({ suggestionArray: [], suggestionVisible: false })
        // }
    }



    submitSearchHandler() {

        if (this.state.searchInputText.length !== 0) {
            if (this.state.searchInputText.toLowerCase().includes("near me")) {
                this.handleNearMeMarkersApi(this.state.myLatitude, this.state.myLongitude)
                if (this.state.mapListToggle) {
                    this.state.mapRef.current.animateToRegion({
                        latitude: this.state.myLatitude,
                        longitude: this.state.myLongitude,
                        latitudeDelta: 0.0822,
                        longitudeDelta: 0.0821
                    }, 2000)
                }
            }
            else {
                this.handleSubmitSearchLocationApi()
            }

        }
    }



    handleSubmitSearchLocationApi() {
        this.setState({ suggestionVisible: false, isLoading: true })
        if (this.state.searchInputText.length === 0) {
            this.setState({ isLoading: false })
        }

        else {
            let trimmedText = this.state.searchInputText
            trimmedText = trimmedText.replace(/,/g, '');
            trimmedText = trimmedText.replace(/ /g, '+')
            if (trimmedText.length !== 0) {
                var init = {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                    }
                }
                let apiString = ""
                if (this.state.type.length === 0) {
                    apiString = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${trimmedText}&key=${key}`
                }
                else {
                    apiString = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.type}+${trimmedText}&key=${key}`
                }



                fetch(apiString, init)
                    .then(res => res.json()
                        .then(data => {
                            var apiData = {
                                status: res.status,
                                data: data
                            }
                            console.log(` textsearch API DATA==>`, apiData)
                            this.setState({ renderMarkersArray: apiData.data.results }, () => this.getEstablishmentAlertStatus())
                            let tempIndex = apiData.data.results.length / 2
                            tempIndex = parseInt(tempIndex.toFixed(0) - 1)
                            if (this.state.mapListToggle) {
                                this.state.mapRef.current.animateToRegion({
                                    latitude: apiData.data.results[tempIndex].geometry.location.lat,
                                    longitude: apiData.data.results[tempIndex].geometry.location.lng,
                                    latitudeDelta: 0.0122,
                                    longitudeDelta: 0.0121
                                }, 3000)
                            }
                            this.setState({ latitude: apiData.data.results[tempIndex].geometry.location.lat, longitude: apiData.data.results[tempIndex].geometry.location.lng, })
                        }))
                    .catch(err => {
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
                        console.log("API ERR ->", err)
                        var apiData = {
                            status: 900,
                            data: "please check your internet connection"
                        }
                    });
            }


        }

    }

    handleNearMeMarkersApi(lat, long) {
        console.log("NAvigate to these===>", lat, long)
        var init = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
            }
        }

        let apiString = ""
        if (this.state.type.length === 0) {
            apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${this.state.radius}&key=${key}`
        }
        else {
            apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${this.state.radius}&type=${this.state.type}&key=${key}`
        }


        fetch(apiString, init)
            .then(res => res.json()
                .then(data => {
                    var apiData = {
                        status: res.status,
                        data: data
                    }
                    console.log(`handleNearMeMarkersApi API DATA==>`, res, "API DATA ", apiData, "DATA", data)
                    this.setState({ renderMarkersArray: apiData.data.results },  
                        () => this.getEstablishmentAlertStatus() 
                        )

                }))
            .catch(err => {
                this.setState({ isLoading: false })
                setTimeout(() => {
                    Alert.alert(
                        '',
                        "An error occurred while fetching establishment data. Please try again !",
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                }, 200);
                console.log("API ERR ->", err)
                var apiData = {
                    status: 900,
                    data: "please check your internet connection"
                }
            });

    }

    handleOnClickFromSuggestion(item) {
        this.setState({ searchInputText: item.description }, () => this.submitSearchHandler())
    }

    getProfileDetails = async () => {
        return new Promise(resolve => {
     
               let placeReportArray = []
            var databaseRef = database.ref("place_reports");
            databaseRef.on('value',(snapshot)=> {
                 snapshot.forEach( function(data) {
                    placeReportArray.push(data.val().place_id)
                });
                resolve(placeReportArray)
            })


    //     AsyncStorage.getItem("LOGIN_CREDENTIALS").then(async (resp) => {
    //         if (JSON.parse(resp) !== null) {
                
    //     database.ref().child('place_reports').orderByChild('place_id').equalTo(JSON.parse(resp).mobile).on("value", function(snapshot) {
         
    //         snap2shot.forEach( function(data) {
               
                
    //             resolve(data.val())
    //         });
    //     });
    // }
    // }); 


})
    }



    getEstablishmentAlertStatus() {



        let reqArrayTemp = this.state.renderMarkersArray.map((item, index) => item.place_id)
        console.log(" reqArrayTemp==>", reqArrayTemp)

        this.getProfileDetails().then(async(rootPlaceDetails)=>{ 

           console.log("rootPlaceDetails===>",rootPlaceDetails)
           let updatedRenderMarkersArray = this.state.renderMarkersArray.map((markerItem, markerIndex) => {
            let covid_status = "No info"
            rootPlaceDetails.forEach((mElement, mIndex) => {
                if (markerItem.place_id === mElement) covid_status = "ALERT"
            })
            return ({
                ...markerItem,
                covid_status
            })
        })
        this.setState({ renderMarkersArray: updatedRenderMarkersArray, isLoading: false })
        if (!this.state.onChangeCompleteFirstTimeStatus) {
            setTimeout(() => {
                this.setState({ onChangeCompleteFirstTimeStatus: true })
            }, 1000);
        }

          });


    }

    handleRefresh() {
        this.spin()

        this.handleNearMeMarkersApi(this.state.currentFocusScreenLat, this.state.currentFocusScreenLong)
        if (this.state.mapListToggle) {
            this.state.mapRef.current.animateToRegion({
                latitude: this.state.currentFocusScreenLat,
                longitude: this.state.currentFocusScreenLong,
                latitudeDelta: 0.0822,
                longitudeDelta: 0.0821
            }, 2000)
        }

    }


    renderItem(item) {
        return (<Touchable onPress={() => this.handleOnClickFromSuggestion(item)}>
            <AppView style={styles.suggestionsTextWrapper}>
                <AppText style={styles.suggestionsText}>
                    {item.description}
                </AppText>
            </AppView>
        </Touchable>
        );
    };


    handleClickOnSelectedMarker() {
        let address = this.state.selectedMarkerDetails.vicinity ? this.state.selectedMarkerDetails.vicinity : this.state.selectedMarkerDetails.formatted_address
        this.props.navigation.navigate("PlaceView", {
            address: address,
            title: this.state.selectedMarkerDetails.name,
            alertStatus: this.state.selectedMarkerDetails.covid_status,
            alertStatusText: this.state.selectedMarkerText,
            AlertStatusIcon: this.state.selectedMarkerStatusIcon,
            place_id: this.state.selectedMarkerDetails.place_id,
            latitude: this.state.selectedMarkerDetails.geometry.location.lat,
            longitude: this.state.selectedMarkerDetails.geometry.location.lng,
            category: this.state.selectedMarkerDetails.types
        })
    }
    handleClickOnMarker(item, index, AlertText, AlertStatusIcon, AlertMarkerIcon) {
        this.setState({
            selectedMarkerIndex: index, updateRegion: false,
            selectedMarkerStatus: true,
            selectedMarkerDetails: item,
            selectedMarkerText: AlertText,
            selectedMarkerStatusIcon: AlertStatusIcon,
            selectedMarkerIcon: AlertMarkerIcon
        })
        let tempArrayMarker = this.state.renderMarkersArray
        if (tempArrayMarker[index].clickedOnce === true) {
            let address = item.vicinity ? item.vicinity : item.formatted_address
            this.props.navigation.navigate("PlaceView", {
                address: address,
                title: item.name,
                alertStatus: item.covid_status,
                alertStatusText: AlertText,
                AlertStatusIcon: AlertStatusIcon,
                place_id: item.place_id,
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
                category: item.types,
                permanently_closed: item.permanently_closed ? true : false,
                open_now: item.opening_hours ? item.opening_hours.open_now : false,
                noOpenStatus: item.opening_hours ? true : false
            }
            )
        }
        else {

            console.log("index===>", index)
            tempArrayMarker[index] = {
                ...item,
                clickedOnce: true
            }
            this.setState({ renderMarkersArray: tempArrayMarker }, () => console.log("after clicking", this.state.renderMarkersArray))
        }
    }

    handleCategory(categoryItem) {
        this.setState({
            type: categoryItem.type, categoryName: categoryItem.name, radius: categoryItem.radius, onSubmitEditingStatus: false,
            modalVisibleCategory: false, searchInputText: '', isLoading: true
        }, () => {
            this.handleNearMeMarkersApi(this.state.currentFocusScreenLat, this.state.currentFocusScreenLong)
            if (this.state.mapListToggle) {
                this.state.mapRef.current.animateToRegion({
                    latitude: this.state.currentFocusScreenLat,
                    longitude: this.state.currentFocusScreenLong,
                    latitudeDelta: 0.0822,
                    longitudeDelta: 0.0821
                }, 2000)
            }

        })

    }
    spin() {
        this.spinValue.setValue(0)

        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            //   easing: Easing.linear,
        }).start();
    }
    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '720deg'],
        });
        const { MAP, LIST, ADDRESS_AREA, SEARCH_LOCATION } = this.props.COMMON_TEXT
        const { MY_PROFILE, FIRST_NAME, LAST_NAME, EMAIL, MOBILE, MY_ZIP_CODE } = this.props.MyProfile
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                {/* <Loader
                    visible={this.state.isLoading}
                /> */}
                <AppView style={{ marginBottom: this.state.footerVisibleToggle ? hp(10) : null }}>
                    <AppView style={{ flexDirection: 'row', justifyContent: 'space-around', }}>

                        <Touchable

                            onPress={() => this.setState({ modalVisibleCategory: !this.state.modalVisibleCategory })}
                            style={[styles.InputContainer, { marginHorizontal: wp(1), }]}>

                            <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.InputWrapper}>
                                <AppText style={styles.buttonText}>
                                    {this.state.categoryName.length === 0 ? SEARCH_LOCATION : this.state.categoryName}
                                </AppText>
                                <AppImage source={dropDownWhiteArrow} style={{ height: hp(2), width: wp(5), alignSelf: 'center', }} />
                            </AppbackgraoundImage>
                        </Touchable>



                        <Touchable onPress={() => this.handleRefresh()} style={{ alignSelf: 'center' }}>
                            <Animated.Image
                                resizeMode="contain"
                                style={[styles.alertIcon, {
                                    height: hp(8),
                                    width: wp(16),
                                    transform: [{ rotateY: spin }],
                                }]}
                                source={refreshMarker}
                            />
                        </Touchable>



                    </AppView>


                    <AppView style={{
                        flexDirection: 'row',
                        marginHorizontal: wp(3), width: wp(100)
                    }}>



                        <AppView style={[styles.searchContainer, { width: wp(60) }]}>
                            <AppImage source={searchIcon} style={styles.searchIcon} />
                            <AppInput
                                onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onChangeText={(text) => this.handleAutoSearch(text)}
                                value={this.state.searchInputText}
                                onSubmitEditing={() => {
                                    this.setState({ onSubmitEditingStatus: true })
                                    this.submitSearchHandler()
                                }}
                                placeholder={ADDRESS_AREA} style={[styles.InputStyle, { width: wp(45) }]} placeholderTextColor={GREY_TEXT} />

                            {this.state.searchInputText.length !== 0 ?
                                <Touchable onPress={() => this.setState({ searchInputText: '' })}
                                    style={{ alignSelf: 'center' }}>
                                    <AppImage source={crossIcon} style={{ height: hp(3), width: wp(5) }} />
                                </Touchable> : null
                            }
                        </AppView>
                        <AppView style={{ flexDirection: 'row', width: wp(30), marginHorizontal: wp(2), }}>
                            <AppView style={styles.alertStatusContainer}>
                                <Touchable onPress={() => this.handleCovidAlertStatus()} style={{ alignSelf: 'center', }}>
                                    <AppImage source={this.state.mapListToggle ? listIcon : mapIcon} style={styles.alertIcon} />
                                </Touchable>
                            </AppView>
                            <AppView style={styles.alertStatusContainer}>
                                <Touchable onPress={() => this.props.navigation.navigate("Hotspots")} style={{ alignSelf: 'center' }}>
                                    <AppImage source={hotspotIcon} style={styles.alertIcon} />
                                </Touchable>
                            </AppView>
                        </AppView>




                    </AppView>
                    {this.state.suggestionVisible ? <AppView style={styles.suggestionsContainer}>
                        <FlatList
                            nestedScrollEnabled
                            data={this.state.suggestionArray}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={(item) => item.place_id}
                        //   extraData={selectedId}

                        />
                    </AppView> : null}
                    <AppView style={{ marginTop: hp(0.5), }}>
                        {
                            this.state.mapListToggle ?
                                <AppView style={styles.MapView}>
                                    <MapView style={styles.MapView}
                                        provider={PROVIDER_GOOGLE}
                                        followsUserLocation={true}
                                        showsUserLocation={true}
                                        // showsMyLocationButton={true}
                                        // showsCompass={true}
                                        // toolbarEnabled={true}
                                        // zoomEnabled={true}
                                        // rotateEnabled={true}
                                        ref={this.state.mapRef}
                                        onRegionChangeComplete={(region) => this.regionChanged(region)}
                                        initialRegion={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude,
                                            latitudeDelta: 0.0122,
                                            longitudeDelta: 0.0121
                                        }}
                                    >
                                        {/* {this.state.selectedMarkerStatus? 
                                                    <MapView.Marker
                                                        coordinate={{ latitude: this.state.selectedMarkerDetails.geometry.location.lat, longitude: this.state.selectedMarkerDetails.geometry.location.lng }}
                                                        key={`${this.state.selectedMarkerDetails.place_id}`}
                                                        onPress={() => this.handleClickOnSelectedMarker()}
                                                    >            
                                                    <AppView style={{ justifyContent: 'center', flex: 0.5, }}>
                                                                    <AppbackgraoundImage source={this.state.selectedMarkerStatusIcon} resizeMode="contain" style={[styles.mapMarkerStyle]}>
                                                                        <AppText style={styles.iconText}>
                                                                            {this.state.selectedMarkerText}
                                                                        </AppText>
                                                                    </AppbackgraoundImage>
                                                                    <AppView style={styles.mapMarkerTextWrapper}>
                                                                        <AppText style={styles.mapMarkerTitle}>{this.state.selectedMarkerDetails.name}</AppText>
                                                                    </AppView>
                                                                    <AppImage source={this.state.selectedMarkerIcon} style={styles.markerIcon} />
                                                                </AppView>
                                                    </MapView.Marker> 
                                                    :null
                                        
                                    } */}
                                        {
                                            this.state.renderMarkersArray.map((item, index) => {
                                                let AlertStatusIcon = whiteIcon
                                                let AlertText = ""
                                                let AlertMarkerIcon = whiteMarker
                                                switch (item.covid_status) {
                                                    case "SAFE":
                                                        AlertStatusIcon = safeIcon
                                                        AlertMarkerIcon = safeMarker
                                                        AlertText = "S"
                                                        break;
                                                    case "ALERT":
                                                        AlertStatusIcon = alertIcon
                                                        AlertMarkerIcon = alertMarker
                                                        AlertText = "A"
                                                        break;
                                                    case "Partial Safe":
                                                        AlertStatusIcon = partialIcon
                                                        AlertMarkerIcon = partialMarker
                                                        AlertText = "P"
                                                        break;
                                                    default:
                                                        AlertStatusIcon = whiteIcon
                                                        AlertMarkerIcon = whiteMarker
                                                        AlertText = ""
                                                }
                                                return (

                                                    <MapView.Marker
                                                        coordinate={{ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng }}
                                                        key={`${item.place_id}`}
                                                        // onPress={() => this.props.navigation.navigate("PlaceView" ,{title:"Work Grill" ,alertStatus:"P"} )}
                                                        onPress={() => this.handleClickOnMarker(item, index, AlertText, AlertStatusIcon, AlertMarkerIcon)}
                                                    >


                                                        {item.clickedOnce ?
                                                            this.state.selectedMarkerIndex === index ?

                                                                <AppView style={{ justifyContent: 'center', flex: 0.5, }}>
                                                                    <AppbackgraoundImage source={AlertStatusIcon} resizeMode="contain" style={[styles.mapMarkerStyle]}>
                                                                        <AppText style={styles.iconText}>
                                                                            {AlertText}
                                                                        </AppText>
                                                                    </AppbackgraoundImage>
                                                                    <AppView style={styles.mapMarkerTextWrapper}>
                                                                        <AppText style={styles.mapMarkerTitle}>{item.name}</AppText>
                                                                    </AppView>
                                                                    <AppImage source={AlertMarkerIcon} style={styles.markerIcon} />
                                                                </AppView>

                                                                : <AppImage source={AlertMarkerIcon} style={styles.markerIcon} />
                                                            :

                                                            <AppImage source={AlertMarkerIcon} style={styles.markerIcon} />

                                                        }
                                                    </MapView.Marker>
                                                )
                                            })
                                        }
                                    </MapView>
                                </AppView>
                                :
                                <AppView style={{ height: Platform.OS === "ios" ? hp(60) : hp(63), width: wp(100) }}>
                                    {/* <AppView style={styles.scrollViewContainer}> */}
                                    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

                                        {this.state.renderMarkersArray.map((item, index) => {

                                            let permanently_closed = item.permanently_closed ? true : false
                                            let open_now = item.opening_hours ? item.opening_hours.open_now : false
                                            let noOpenStatus = item.opening_hours ? true : false

                                            let AlertStatusIcon = whiteIcon
                                            let AlertText = ""
                                            switch (item.covid_status) {
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
                                            let address = item.vicinity ? item.vicinity : item.formatted_address
                                            return (
                                                <Touchable onPress={() => this.props.navigation.navigate("PlaceView", {
                                                    address: address,
                                                    title: item.name,
                                                    alertStatus: item.covid_status,
                                                    alertStatusText: AlertText,
                                                    AlertStatusIcon: AlertStatusIcon,
                                                    place_id: item.place_id,
                                                    latitude: item.geometry.location.lat,
                                                    longitude: item.geometry.location.lng,
                                                    category: item.types,
                                                    permanently_closed: item.permanently_closed ? true : false,
                                                    open_now: item.opening_hours ? item.opening_hours.open_now : false,
                                                    noOpenStatus: item.opening_hours ? true : false
                                                })}>
                                                    <AppView style={styles.cardViewContainer}>
                                                        <AppView style={styles.iconWrapper}>
                                                            {<AppView style={[styles.iconStyle,]}>
                                                                <AppbackgraoundImage source={AlertStatusIcon} resizeMode="contain" style={[styles.iconStyle, { width: wp(10) }]}>
                                                                    <AppText style={styles.iconText}>
                                                                        {AlertText}
                                                                    </AppText>
                                                                </AppbackgraoundImage>
                                                            </AppView>

                                                            }
                                                        </AppView>
                                                        <AppView style={styles.establishmentName}>
                                                            <AppView>
                                                                <AppText style={[styles.establishmentText]}>
                                                                    {item.name}
                                                                </AppText>
                                                            </AppView>

                                                            <AppView>
                                                                <AppText style={styles.estDistanceText}>
                                                                    {address}
                                                                </AppText>
                                                            </AppView>

                                                            {permanently_closed ?
                                                                <AppText style={styles.estDistanceText}>
                                                                    {`Permanently Closed `}
                                                                </AppText> :

                                                                noOpenStatus ?
                                                                    <AppText style={styles.estDistanceText}>
                                                                        {open_now ? "Open Now" : "Currently Closed"}
                                                                    </AppText> : null

                                                            }


                                                        </AppView>
                                                        <AppView style={styles.iconWrapper}>
                                                            <AppImage source={rightArrow} resizeMode="contain" style={{ height: hp(2), width: wp(4), marginLeft: wp(5), marginRight: wp(3) }} />
                                                        </AppView>
                                                    </AppView>
                                                </Touchable>
                                            )

                                        }

                                        )
                                        }


                                    </ScrollView>
                                </AppView>


                        }
                    </AppView>
                </AppView>
                <CategoryModal
                
                    data={this.state.categoryList}
                    visible={this.state.modalVisibleCategory}
                    onPress={(categoryItem) => this.handleCategory(categoryItem)}
                    cancelPress={() => this.setState({ modalVisibleCategory: !this.state.modalVisibleCategory })}
                />
                {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        MyProfile: state.reducer.language.MyProfile,
        COMMON_TEXT: state.reducer.language.COMMON_TEXT,
        token: state.AuthReducer.Token

    }
}

export default connect(mapStateToProps)(EstablishmentMap);