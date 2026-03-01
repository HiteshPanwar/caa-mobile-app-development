import * as React from 'react';
import {
    View, Dimensions,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Login from "../screens/LoginScreen/index";
import Browser from "../screens/LoginScreen/WebView"
import Otp from  "../screens/OTP screen/index"
import PlaceView from  "../screens/PlaceView/index"
import FurtherInfo from "../screens/PlaceView/FurtherInfo/index"
import AboutUs from "../screens/AboutUs/index";
import MyProfile from '../screens/Settings/MyProfile/index'
import FAQScreen from '../screens/FAQScreen/index'
import CovidServices from '../screens/CovidServices/index'
import TermsCondition from '../screens/TermsNConditionsScreen/index'
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen/index"
import Home from "../screens/Home/index"
import ReportEstablishment from "../screens/ReportOnEstablishment/index"
import VisitorReport from "../screens/ReportOnEstablishment/VisitorReport/index"
import EmployeReport from "../screens/ReportOnEstablishment/EmployeReport/index"
import ManagerReport from "../screens/ReportOnEstablishment/ManagerReport/index"
import PrivacyPushSettings from "../screens/PrivacyPushSettings/index"
import MyCAAActivity from "../screens/MyCAAActivity/index"
import ContactUs from "../screens/ContactUs/index"
import Settings from '../screens/Settings/index'
import EmaiNImSetting from '../screens/EmaiNImSetting/index';
import EstablishmentMap from '../screens/EstablishmentMap/index';
import Feedback from '../screens/Home/Feedback/index'
import ReportError from '../screens/ReportError/index';
import Hotspots from '../screens/Hotspots/index';
import ValidLogin from '../screens/ValidLogin/index'
import { RED_BG_THEME} from '@GlobalStyles/colors';
import {DrawerContent} from './DrawerContent'
import MyLocation from '../screens/MyLocation';
import CaptchaScreen from '../screens/Captcha/index'
import SignUp from '../screens/SignUpScreen/index'
let { Width, Height } = Dimensions.get('window');
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const renderHeader = () => {
    return (<View style={{flex:1,backgroundColor:"blue",height:hp(3),width:wp(5)}}>

    </View>)
}
const Stack = createStackNavigator();
function NavStack({ navigation, route }) {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown: false,
        //    gestureEnabled: false,
           }}
        initialRouteName="ValidLogin">
              <Stack.Screen name="CaptchaScreen" options={{headerShown:false}} component={CaptchaScreen} />
            <Stack.Screen name="ValidLogin" options={{headerShown:false}}  component={ValidLogin} />
            
            <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
            <Stack.Screen name="SignUp" options={{headerShown:false}} component={SignUp} />
            
            <Stack.Screen name="Browser"  component={Browser} options={{ 
                title: false,
             headerStyle: {
            backgroundColor: RED_BG_THEME,
          }}} />
            <Stack.Screen name="Otp" component={Otp} options={{headerShown:false}} />
            <Stack.Screen name="ReportEstablishment" component={ReportEstablishment} options={{headerShown:false}} />
            <Stack.Screen name="Drawer" options={{ headerShown: false }} 
            options={{ gestureEnabled: false }}
            component={SideDrawer} />
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />
            <Stack.Screen name="MyProfile" component={MyProfile} options={{headerShown:false}} />
            <Stack.Screen name="ManagerReport" options={{headerShown:false}} component={ManagerReport} /> 
        </Stack.Navigator>
    )
}
const Drawer = createDrawerNavigator();
function SideDrawer() {
    return (
        <Drawer.Navigator 
        screenOptions={{ headerShown: false,}}
        drawerContent={props =><DrawerContent {...props}/>}> 
        <Drawer.Screen name="Home"  component={Home}  />
        <Drawer.Screen name="EstablishmentMap" component={EstablishmentMap} /> 
        <Drawer.Screen name="Hotspots" component={Hotspots} /> 
       
            <Drawer.Screen name="MyLocation" component={MyLocation} /> 
            <Drawer.Screen name="EmailNImSetting" options={{ drawerLabel: "Email and Im Setting"}}component={EmaiNImSetting} />
            <Drawer.Screen name="MyCAAActivity" component={MyCAAActivity} />
            <Drawer.Screen name="Feedback" component={Feedback} />
            <Drawer.Screen name="PrivacyPushSettings" component={PrivacyPushSettings} />
           
            <Drawer.Screen name="ReportEstablishment" component={ReportEstablishment} options={{headerShown:false}} />
            <Drawer.Screen name="VisitorReport" options={{headerShown:false}} component={VisitorReport} /> 
            <Drawer.Screen name="EmployeReport" options={{headerShown:false}} component={EmployeReport} /> 
            <Drawer.Screen name="ManagerReport" options={{headerShown:false}} component={ManagerReport} /> 
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="TermsCondition" options={{ drawerLabel: "Terms And Conditions"  }} component={TermsCondition} />
            <Drawer.Screen name="CovidServies" options={{ drawerLabel: "Covid Servies"  }} component={CovidServices} />
            <Drawer.Screen name="PrivacyPolicy" options={{ drawerLabel: "Privacy Policy"  }} component={PrivacyPolicyScreen} />
            <Drawer.Screen name="FAQScreen" component={FAQScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUs} />
            <Drawer.Screen name="Settings"  options={{ drawerLabel: "Settings" }} component={Settings}  />
            <Drawer.Screen name="MyProfile" component={MyProfile} />
            <Drawer.Screen name="PlaceView" component={PlaceView} />
            <Drawer.Screen name="FurtherInfo" component={FurtherInfo} />
            <Drawer.Screen name="ReportError" component={ReportError} />
            
            
        </Drawer.Navigator>
    )

}

export default function Navigation() {
    return (
        <NavigationContainer>
            <NavStack />
        </NavigationContainer>
    );
}
