
import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "../../Components/Atoms/index"
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { KeyboardAvoidingView, ScrollView ,Share,ToastAndroid,Platform,Alert} from 'react-native'
import { Header, Footer } from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blueBarIcon } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import { shareIconHome ,donateIcon,darkBlueBarNoBorder,lighBlueBarNoBorder} from "@Assets/Icon";
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR } from '@GlobalStyles/colors'
import { socket } from "../../SocketAPI/global";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import ApiRequest from '../../RestAPI/rest';


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      watchID: null,
      myLatitude:"",
      myLongitude:"",
      radius: "5000"
    };
  };
     
 
  componentDidMount(){
    
    this.props.navigation.addListener('focus', () => {
     
     setTimeout(() => {
      // this.getLocation()
     }, 2000);
      
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
}

getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) return;
    this.setState({ loading: true }, () => {
        Geolocation.getCurrentPosition(
            async (position) => {
              const initialPosition = JSON.stringify(position);
              this.setState({ initialPosition });
             
              console.log("getCurrentPosition",JSON.stringify(position))

              this.setState({
                myLatitude: position.coords.latitude,
                myLongitude: position.coords.longitude
            })
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
        );
       let watchID = Geolocation.watchPosition(position => {
        const lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
        console.log("getCurrentPosition",JSON.stringify(position))
        this.setState({
          myLatitude: position.coords.latitude,
          myLongitude: position.coords.longitude
      })
      // this.getEstablishments(position.coords.latitude,position.coords.longitude)
      });

      this.setState({watchID : watchID})

    });
}

getEstablishments(lat, long) {
  console.log("NAvigate to these===>", lat, long)
  const key = "AIzaSyC1MUcfavhcz08tL5oNHckMOmvzQ3bXeps"
  var init = {
      method: "GET",
      headers: {
          'Content-Type': "application/json",
      }
  }
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10&key=${key}`, init)
      .then(res => res.json()
          .then(data => {
              var apiData = {
                  status: res.status,
                  data: data
              }
              console.log(`handleNearMeMarkersApi API DATA==>`, apiData)
              // alert(apiData.data.results[0].name)
              // this.sendEstablishments(apiData.data.results)
          }))
      .catch(err => {
          console.log("API ERR ->", err)
          var apiData = {
              status: 900,
              data: "please check your internet connection"
          }
      });
}


sendEstablishments(establishmentArray){
  let reqArrayTemp= establishmentArray.map((item,index)=>item.place_id)
  console.log("handleCovidAlertStatus reqArrayTemp==>",reqArrayTemp)
 ApiRequest({
  "place_id":reqArrayTemp
},"user-app/push-notification","POST",this.props.token)
 .then(async resp => {
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
      console.log("user-app/get-establishment")
       break;
     }
     default: {
       this.setState({isLoading:false})
       setTimeout(() => {
         Alert.alert(
             "",
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

 alertModal =(body,title)=>{
  Alert.alert(
      title,
      body,
 //    resp.data.response_message,
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
 }

componentWillUnmount() {
  // this.state.watchID != null && Geolocation.clearWatch(this.watchID);
}
   onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Share this app  ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  render() {
    const { HELPING_BUISSNESS_TEXT1, HELPING_BUISSNESS_TEXT2, THE_FREE_APP1, THE_FREE_APP2,
      THE_FREE_APP3, THE_FREE_APP4, SHARE_WITH, SEND_US,YOUR_DONATIONS,REVIEW_TERMS } = this.props.language.HomePage

    const {PRIVACY_POLICY,WE_DO_NOT1,WE_DO_NOT2,TERMS_CONDITIONS,CHECK_ESTABLISHMENT,REPORT_ESTABLISHMENT ,CHECK_HOTSPOT  } = this.props.COMMON_TEXT
    return (
      <AppView style={{ flex: 1 }}>
        <Header />
        <Container style={{ marginBottom: hp(28.75) }}>
          <AppView style={styles.TextWrapper}>
            <AppText style={styles.headerTextFooter2}>
              {HELPING_BUISSNESS_TEXT1}
            </AppText>
            <AppText style={styles.headerTextFooter2}>
              {HELPING_BUISSNESS_TEXT2}
            </AppText>
          </AppView>
          <AppView style={styles.TextWrapper1}>
            <AppText style={styles.headerTextFooter3}>
              {THE_FREE_APP1}
            </AppText>
            <AppText style={styles.headerTextFooter3}>
              {THE_FREE_APP2}
            </AppText>
            <AppText style={styles.headerTextFooter3}>
              {THE_FREE_APP3}
            </AppText>
            <AppText style={styles.headerTextFooter3}>
              {THE_FREE_APP4}
            </AppText>
          </AppView>
          <AppView style={[styles.establishmentContainer ,{  marginTop:hp(7)}]}>
                          
                              <Touchable 
                            onPress={()=>this.props.navigation.navigate('EstablishmentMap')}>
                            <AppView 
                            style={styles.establishmentWrapper}>
                                <AppText style={styles.establishmentText}>
                                  {CHECK_ESTABLISHMENT}
                                </AppText>
                            </AppView>
                            </Touchable>
                            <Touchable 
                           
                            onPress={()=>this.props.navigation.navigate('Hotspots')}>
                            <AppView
                             style={ [styles.establishmentWrapper ,{backgroundColor: RED_BG_THEME,} ]}>
                                <AppText style={[styles.establishmentText ,{width:wp(20)} ]}>
                                  {CHECK_HOTSPOT}
                                </AppText>
                            </AppView>
                            </Touchable>

                       </AppView>

          <AppView style={[{  marginHorizontal: wp(5) ,paddingTop:hp(5)},]}>          
          <AppView style={[{ flexDirection: 'row',height:hp(4),alignItems:"center"},]}>
          <Touchable onPress={()=> this.onShare()} style={{}}>
            <AppImage source={shareIconHome} style={{ width: wp(10), height: hp(10) }} />
            </Touchable>
            <AppText style={styles.headerTextFooter2}>
              {SHARE_WITH}
            </AppText>


          </AppView>
          {/* <AppView style={[{ flexDirection: 'row',height:hp(20),alignItems:"center",
          width:wp(98),alignSelf: 'center',justifyContent: 'center',}]}>
       
          <Touchable onPress={()=> this.alertModal("Coming soon")}>
        <AppImage source={shareIconHome} style={{ width: wp(10), height: hp(10) }} />
            </Touchable>
           
            <Touchable onPress={()=> this.alertModal("Coming soon")}>
            <AppImage source={donateIcon} style={{ width: wp(10), height: hp(10) ,marginHorizontal: wp(2),}} />
            </Touchable>
            <AppView style={{flexDirection: 'column',}}>
            <AppText style={[styles.headerTextFooter2,styles.donationText]}>
              {YOUR_DONATIONS}
            </AppText>
            <AppText style={[styles.headerTextFooter2,styles.donationText2,]}>
              {`We are NOT a non-profit or charity`}
            </AppText>
            <AppText style={[styles.headerTextFooter2,styles.donationText2,]}>
              {` Donations are not tax deductible`}
            </AppText>
           
            </AppView>
          </AppView> */}
          </AppView>
                     

        </Container>
        <Footer footer_type={"1"} style={{ position: 'absolute', bottom: 0 }}  
      
        />
      </AppView>


    );
  }
}
const mapStateToProps = state => {
  console.log("state==>>", state.reducer.language)
  return {
    language: state.reducer.language,
    COMMON_TEXT: state.reducer.language.COMMON_TEXT,
    token:state.AuthReducer.Token
  }
}

export default connect(mapStateToProps)(Home);

