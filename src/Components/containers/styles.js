import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import {  WHITE, BLACK } from '@GlobalStyles/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    defaultContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentContainerStyle:{
        //   flex:1,
            // justifyContent: "flex-start",
            // alignItems: "center",
            // backgroundColor:"red"
           
        },
        ContainerStyle: {
            flex:1
        },
}






























