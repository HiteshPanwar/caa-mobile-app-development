import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "@Component/Atoms/index"
import {  KeyboardAvoidingView, ScrollView, Dimensions,Platform ,ToastAndroid} from 'react-native'
import { Header, Footer, CustomButton } from '@Component/molecules/index';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect, } from 'react-redux';
import {  DARKBLUE ,BLUE_BAR} from "@GlobalStyles/colors"
import { Container } from '@Component/containers/index'
import ApiRequest from '../../RestAPI/rest'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {CountryModal} from "./countryModal"
import {StateModal} from "./stateModal"
import { Country } from './countrycode'
import {fontStyle} from '@Assets/commonFont/commonFont'
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import {Loader}  from "@Component/loader";
import {
  blueBarIconWhiteBorder,
  alertSelectedCircle,
  alertUnselectedCircle,
  mapIcon
} from '@Assets/Icon'
var DomParser = require('react-native-html-parser').DOMParser
const key = "AIzaSyC1MUcfavhcz08tL5oNHckMOmvzQ3bXeps"

const mapRef = React.createRef();
class Hotspots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about:"",
            modalVisiblecountry:false,
            selectedCountry:"SELECT COUNTRY",
            selectedState:"SELECT STATE",
            covidData:{},
            countryCovidData:[],
            lat:"37.78825",
            long:"-122.4324",
            loading:false,
            isLoading:true,
            dataFetchedStatus:false,
            cityStatus:false,
            stateCovidList:[],
            cityCovidList:[],
            firstTimeState :"",
            firstTimeCountry:"",
            wholeCountryCases:{},
            wholeCountryCasesStatus:false,
            modalVisibleState:false,
            myLatitude:'',
            myLongitude:'',
            mapRegion: {
              latitude: 37.0902,
              longitude: -95.7129,
                latitudeDelta: 20.002,
                longitudeDelta: 20.0002,
              },
        };
    }

    
    componentDidMount(){
    
        this.props.navigation.addListener('focus', () => {
          
      this.getReportProfile()
      });

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
        return false;
      }
      getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) return;
    
        this.setState({ loading: true }, () => {
          Geolocation.getCurrentPosition(
            async (position) => {
                // let obj =  {
                //     latitude:position.coords.latitude ,
                //     longitude: position.coords.longitude,
                //     // latitudeDelta: 0.002,
                //     // longitudeDelta: 0.0002,
                //     latitudeDelta: 10.0922,
                //     longitudeDelta: 8.0921
                //   } 
                this.setState({isLoading:false,myLatitude:position.coords.latitude,myLongitude:position.coords.longitude})
                mapRef.current.animateToRegion({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    latitudeDelta: 10.0922,
                    longitudeDelta: 8.0921
                  },2000)
                 
                    this.renderInitialCovidMarkers(position.coords.latitude,position.coords.longitude)
                  
            //   await this.setState({ mapRegion:obj ,  loading: false });
            //   console.log("position===>", position);
            //   console.log("position===>", this.state.longitude);
                console.log("position===>",position);
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

    getReportProfile(){
        var init = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",    
            }
        }
        fetch(`https://bing.com/covid`, init)
        .then(res => res.text()
            .then(data => {
                var apiData = {
                    status: res.status,
                    data: data
                }
                console.log(`API DATA==>`,apiData)
                console.log(`API DATA==>`,data)
                let doc = new DomParser().parseFromString(data,'text/html')
                let textDATA = doc.getElementById('main').firstChild.firstChild.data
                textDATA = textDATA.substring(4)
                  let dataInJSON= eval(textDATA)
          console.log("doc1===>>>",dataInJSON)
          this.setState({covidData : dataInJSON,dataFetchedStatus:true},()=>this.getLocation())
          
            }))
        .catch(err => {
             console.log("API ERR ->",err)
            var apiData = {
                status: 900,
                data: "please check your internet connection"
            }
           
        });
    }


    renderInitialCovidMarkers(latitude,longitude){
             let firstTimeState  = ""
             let firstTimeCountry = ""
             let city = ""
             let region = ""
             let country =""
      var init = {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        }
    }
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`, init)
      .then(res => res.json()
          .then(data => {
              var apiData = {
                  status: res.status,
                  data: data
              }
              console.log(` geocode API DATA==>`, apiData)
              this.setState({isLoading:false})
             let results = apiData.data.results

              
              if (results[1]) {
                let indice=0;
                for (var j=0; j<results.length; j++)
                {
                    if (results[j].types[0]=='administrative_area_level_1')
                        {
                            indice=j;
                            break;
                        }
                    }
                    console.log('The good number is: '+j);
                console.log(results[j]);
                for (let i=0; i<results[j].address_components.length; i++)
                    {
                       
                        if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                                //this is the object you are looking for State
                                region = results[j].address_components[i];
                            }
                        if (results[j].address_components[i].types[0] == "country") {
                                //this is the object you are looking for
                                country = results[j].address_components[i];
                            }
                    }
        
                    //city data
                    console.log(city.long_name + " || " + region.long_name + " || " + country.long_name)
                     firstTimeState  = region.long_name
                    firstTimeCountry = country.long_name

                    this.setState({firstTimeState:region.long_name,firstTimeCountry:country.long_name})
                    this.getFirstTimeCovidMarkerDetailsCountry(firstTimeCountry)

                    
                    } else {
                      console.log("No results found");
                    }

          }))
      .catch(err => {
          console.log("API ERR ->", err)
          var apiData = {
              status: 900,
              data: "please check your internet connection"
          }
      });

    }
    getFirstTimeDetailsState(firstTimeState){
      console.log("getFirstTimeDetailsState==>firstTimeState",firstTimeState)
      
      console.log("getFirstTimeDetailsState==>this.state.stateCovidList",this.state.stateCovidList)
      let stateCovidData= this.state.stateCovidList.filter((item)=>item.displayName===firstTimeState)
      console.log("getFirstTimeDetailsState==>filtered",stateCovidData[0])
       this.getFirstTimeCovidMarkerDetailsState(stateCovidData[0])
    }


   setCountry(countryItem){
   console.log(countryItem)
   this.setState({ modalVisiblecountry: !this.state.modalVisiblecountry,selectedCountry:countryItem.name,selectedState:'SELECT STATE' })
    this.getCovidMarkerDetailsCountry(countryItem.name)
    }

    getFirstTimeCovidMarkerDetailsCountry(countryName){
      console.log("countryName",countryName)
      let countryCovidData= this.state.covidData.areas.filter((item)=>item.displayName===countryName)
         
             console.log("countryCovidData",countryCovidData)
         
              
             if(countryCovidData[0].areas.length!==0){
              this.setState({countryCovidData:countryCovidData[0].areas , wholeCountryCasesStatus:false},()=>mapRef.current.animateToRegion({
              latitude:countryCovidData[0].lat,
              longitude:countryCovidData[0].long,
              latitudeDelta: 15.0922,
              longitudeDelta: 8.0921
            },3000) )
             
             if(countryCovidData[0].areas[0].areas.length!==0){

                console.log("Unsorted array : ",countryCovidData[0].areas)

               let sortedArray = countryCovidData[0].areas.sort((a, b) => a.displayName.localeCompare(b.displayName))

                console.log("sorted array : ",sortedArray)
              this.setState({cityStatus:true,stateCovidList:sortedArray},()=>this.getFirstTimeDetailsState(this.state.firstTimeState))
             }
             else{
               this.setState({cityStatus:false})
             }}
             else{
               mapRef.current.animateToRegion({
                latitude:countryCovidData[0].lat,
                longitude:countryCovidData[0].long,
                latitudeDelta: 15.0922,
                longitudeDelta: 8.0921},3000)
                 this.setState({ wholeCountryCases: countryCovidData[0],wholeCountryCasesStatus:true,cityStatus:false})
              }
    }

   
    getCovidMarkerDetailsCountry(countryName){
        console.log("countryName",countryName)
          let countryCovidData= this.state.covidData.areas.filter((item)=>item.displayName===countryName)
             
                 console.log("countryCovidData",countryCovidData)
             
                   if(countryCovidData[0].areas.length!==0){
                 this.setState({countryCovidData:countryCovidData[0].areas ,wholeCountryCasesStatus:false},()=>mapRef.current.animateToRegion({
                  latitude:countryCovidData[0].lat,
                  longitude:countryCovidData[0].long,
                  latitudeDelta: 15.0922,
                  longitudeDelta: 8.0921
                },3000) )
                 
                 if(countryCovidData[0].areas[0].areas.length!==0){

                    console.log("Unsorted array : ",countryCovidData[0].areas)

                   let sortedArray = countryCovidData[0].areas.sort((a, b) => a.displayName.localeCompare(b.displayName))

                    console.log("sorted array : ",sortedArray)
                  this.setState({cityStatus:true,stateCovidList:sortedArray})
                 }
                 else{
                   this.setState({cityStatus:false})
                 } 
                }
                else{
                  mapRef.current.animateToRegion({
                    latitude:countryCovidData[0].lat,
                    longitude:countryCovidData[0].long,
                    latitudeDelta: 15.0922,
                    longitudeDelta: 8.0921},3000)

                    this.setState({wholeCountryCases: countryCovidData[0],wholeCountryCasesStatus:true,cityStatus:false})
                 }
}

handleSetStates(stateItem){
  console.log(stateItem)
  this.setState({ modalVisibleState: !this.state.modalVisibleState })
  this.getCovidMarkerDetailsState(stateItem)
  this.setState({selectedState:stateItem.displayName})
}

getCovidMarkerDetailsState(stateDetails){
  console.log("stateDetails===>",stateDetails)
  
  if(stateDetails.areas.length!==0){
    this.setState({cityCovidList:stateDetails.areas},()=>
    
      mapRef.current.animateToRegion({
      latitude:stateDetails.lat,
      longitude:stateDetails.long,
      latitudeDelta: 1.0922,
      longitudeDelta: 1.0921
    },4000)
    )
  }

}
getFirstTimeCovidMarkerDetailsState(stateDetails){
  console.log("stateDetails===>",stateDetails)
  
  if(stateDetails.areas.length!==0){
    this.setState({cityCovidList:stateDetails.areas},()=>
    
      mapRef.current.animateToRegion({
      latitude:this.state.myLatitude,
      longitude:this.state.myLongitude,
      latitudeDelta: 1.0922,
      longitudeDelta: 1.0921
    },4000)
    )
  }}
    render() {
        const {PRIVACY_POLICY,WE_DO_NOT } = this.props.language.COMMON_TEXT
        const {ABOUT_US_TITLE,ABOUT_US_DETAILS} = this.props.language.AboutUs



        let styleVar3 = Math.pow(this.state.wholeCountryCases.totalConfirmed, 1/5)
                            styleVar3 = styleVar3.toFixed(0)
                            styleVar3 = parseInt(styleVar3)
                            styleVar3 = styleVar3 * 2
        return (
            <AppView style={{ flex: 1 ,width:wp(100),justifyContent: 'space-between',}}>
            
             <Header />
            <Loader
              visible={this.state.isLoading}
            />
                 <AppView 
                    style={styles.InputContainer}>

                        <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.InputWrapper}>
                            <AppText style={styles.buttonText}>
                                Check Hot Spots
                        </AppText>

                        </AppbackgraoundImage>
                    </AppView>
            <AppView style={{flexDirection: 'row', justifyContent: 'space-around',marginTop: hp(-1.2),}}>
            { this.state.cityStatus?
               
               <AppView style={{height:hp(7),width:wp(72),
               
               justifyContent: 'space-between',flexDirection: 'row'}}>
               <CustomButton
                  
                  disabled = {this.state.dataFetchedStatus}
                   onPress={() => this.setState({ modalVisiblecountry: !this.state.modalVisiblecountry })}
                   style={{width:wp(35),height:hp(6),backgroundColor:this.state.dataFetchedStatus?DARKBLUE:'#A9A9A9',justifyContent: 'center',}}
                       buttonText={this.state.selectedCountry}
                       textstyle={{fontFamily:fontStyle.light,fontSize:normalizeFont(13)}}
                   /> 
                    <CustomButton
                  
                  disabled = {this.state.dataFetchedStatus}
                   onPress={() => this.setState({ modalVisibleState: !this.state.modalVisibleState })}
                   style={{width:wp(35),height:hp(6),backgroundColor:this.state.dataFetchedStatus?DARKBLUE:'#A9A9A9',alignSelf: 'center',justifyContent: 'center',}}
                       buttonText={this.state.selectedState}
                       textstyle={{fontFamily:fontStyle.light,fontSize:normalizeFont(13),alignSelf: 'center',marginHorizontal: wp(2),}}
                   /> 
               </AppView>
               
               :
               <AppView style={{height:hp(7),width:wp(72),
             
               justifyContent: 'center',alignSelf: 'center',}}>
                
                {this.state.dataFetchedStatus?
                <CustomButton
                   disabled = {this.state.dataFetchedStatus}
                    onPress={() => this.setState({ modalVisiblecountry: !this.state.modalVisiblecountry })}
                    style={{width:wp(55),height:hp(6),backgroundColor:this.state.dataFetchedStatus?DARKBLUE:'#A9A9A9',alignSelf: 'center',}}
                    buttonText={this.state.selectedCountry}
                        textstyle={{fontFamily:fontStyle.light,fontSize:normalizeFont(15)}}
                    /> : 
                    <CustomButton
                    style={{width:wp(55),height:hp(6),backgroundColor:this.state.dataFetchedStatus?DARKBLUE:'#A9A9A9',alignSelf: 'center',}}
                    buttonText={this.state.selectedCountry}
                        textstyle={{fontFamily:fontStyle.light}}
                    /> 
                }
                </AppView> 
                }
                            <AppView style={[styles.alertStatusContainer,{marginHorizontal: wp(2)}]}>
                                <Touchable onPress={() => this.props.navigation.navigate("EstablishmentMap")} style={{ alignSelf: 'center', }}>
                                    <AppImage source={mapIcon} style={styles.alertIcon} />
                                </Touchable>
                            </AppView>
                  
            </AppView>
               

                {/* <Container style={{marginBottom:hp(32)}}> */}
                <MapView style={styles.MapView}
                        provider={PROVIDER_GOOGLE}
                        ref={mapRef}
                        // followsUserLocation={true}
                        showsUserLocation={true}
                        // showsMyLocationButton={true}
                        // showsCompass={true}
                        // toolbarEnabled={true}
                        // zoomEnabled={true}
                        // rotateEnabled={true}
                        initialRegion=
                            // latitude: "37.78825",
                            // longitude: "-122.4324",
                            // latitude: this.state.lat,
                            // longitude: this.state.long,
                            // latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                            {this.state.mapRegion}
                          >   
                          
                           { this.state.wholeCountryCasesStatus===true?
                                <MapView.Marker coordinate={{ latitude: this.state.wholeCountryCases.lat, longitude: this.state.wholeCountryCases.long }}
                                    title={this.state.wholeCountryCases.displayName}
                                    description={`Active: ${this.state.wholeCountryCases.totalConfirmed - (this.state.wholeCountryCases.totalDeaths+this.state.wholeCountryCases.totalRecovered)} Recovered: ${this.state.wholeCountryCases.totalRecovered===null?"NA":this.state.wholeCountryCases.totalRecovered} Deceased: ${this.state.wholeCountryCases.totalDeaths===null?"NA":this.state.wholeCountryCases.totalDeaths}`}
                                         >
                                <AppView style={{width: styleVar3, height: styleVar3, borderRadius: styleVar3/ 1.5,backgroundColor: '#d40606',alignSelf: 'center',}}/>
                                </MapView.Marker>:null
                          }
                               
                               
                               {
                               this.state.wholeCountryCasesStatus===true?null:
                               this.state.countryCovidData.length!==0?
                               this.state.countryCovidData.map((item,index)=>{
                               let styleVar2= Math.pow(item.totalConfirmed, 1/5)
                                   styleVar2 = styleVar2.toFixed(0)
                                   styleVar2 = parseInt(styleVar2)
                                   styleVar2 = styleVar2 * 2
                                    // let activeCases= totalConfirmed - (totalDeaths+totalRecovered)
                                return( <MapView.Marker coordinate={{ latitude: item.lat, longitude: item.long }}
                                    title={item.displayName}
                                    description={`Active: ${item.totalConfirmed - (item.totalDeaths+item.totalRecovered)} Recovered: ${item.totalRecovered===null?"NA":item.totalRecovered} Deceased: ${item.totalDeaths===null?"NA":item.totalDeaths}`}
                                >
                                <AppView style={{width: styleVar2, height: styleVar2, borderRadius: styleVar2/ 1.5,backgroundColor: '#d40606',alignSelf: 'center',}}/>
                                </MapView.Marker>
                                )
                               }):null
                               }
                               {this.state.wholeCountryCasesStatus===true?null:
                                 this.state.cityCovidList.length!==0? 
                                 this.state.cityCovidList.map((cityItem,cityindex)=>{
                                  let styleVar2= Math.pow(cityItem.totalConfirmed, 1/5)
                                  styleVar2 = styleVar2.toFixed(0)
                                  styleVar2 = parseInt(styleVar2)
                                  styleVar2 = styleVar2 * 2

                                  return( <MapView.Marker coordinate={{ latitude: cityItem.lat, longitude: cityItem.long }}
                                    title={cityItem.displayName}
                                    description={`Active: ${cityItem.totalConfirmed - (cityItem.totalDeaths+cityItem.totalRecovered)} Recovered: ${cityItem.totalRecovered===null?"NA":cityItem.totalRecovered} Deceased: ${cityItem.totalDeaths===null?"NA":cityItem.totalDeaths}`}
                                ><AppView style={{width: styleVar2, height: styleVar2, borderRadius: styleVar2/ 1.5,backgroundColor: '#d40606',alignSelf: 'center',}}/>
                                
                                </MapView.Marker>
                                )
                                 })
                                 :null
                               }
                    </MapView>  
                    <CountryModal
                                data={Country}
                                visible={this.state.modalVisiblecountry}
                                onPress={(countryItem) =>  this.setCountry(countryItem)}  
                                cancelPress={() => this.setState({ modalVisiblecountry: !this.state.modalVisiblecountry })}
                              />
                    <StateModal
                                data={this.state.stateCovidList}
                                visible={this.state.modalVisibleState}
                                onPress={(stateItem) =>  this.handleSetStates(stateItem)}  
                                cancelPress={() => this.setState({ modalVisibleState: !this.state.modalVisibleState })}
                              />
                       {/* </Container> */}       
                    <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>
        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>",state.reducer.language)
    return {
        language: state.reducer.language
    }
}

export default connect(mapStateToProps)(Hotspots);