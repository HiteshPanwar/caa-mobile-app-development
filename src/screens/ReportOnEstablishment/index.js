import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "@Component/Atoms/index"
import { ScrollView } from "react-native";
import { Header, Footer, CustomButton } from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import {fontStyle} from '@Assets/commonFont/commonFont'
import styles from './styles'
import {  DARKBLUE } from "@GlobalStyles/colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchIcon,backArrow } from '@Assets/Icon'
import { connect, } from 'react-redux';



class ReportEstablishment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            
        };
    }

    render() {
        const {SEARCH_ANOTHER} = this.props.PlaceView
        const { REPORT_ESTABLISHMENT } = this.props.COMMONTEXT
        const {PATRON_VISITOR,EMPLOYEED_HERE,OWN_MANAGE} =this.props.ReportEstablishment
        return (
            <AppView style={{ flex: 1 }}>
                <Header />
                <Container style={{ marginBottom: hp(28.75) }}>
                
                    <AppView style={{ flexDirection:'row'}}>
                   
                   <Touchable style={{marginHorizontal: wp(3),marginTop: hp(1),height:hp(7),justifyContent: 'center',}} onPress={() => { this.props.navigation.goBack() }} >
                    <AppImage source={backArrow} style={{ width: wp(8), height: hp(5) }} />
                   </Touchable>
              


                        <AppView style={styles.buttonView}>
                            <AppView style={styles.buttonContainer}>
                                <AppText style={styles.buttonText}>
                                    {REPORT_ESTABLISHMENT}
                                </AppText>
                            </AppView>
                        </AppView>
                    </AppView>
                    <AppView style={{ flexDirection: "row", alignItems: "center",marginTop:hp(5) }}>
                        <ScrollView style={styles.MiddleView}>
                            <AppText style={styles.middleViewText}>
                           
                            {this.props.route.params.title}
                            </AppText>
                        </ScrollView>
                        <Touchable onPress={() => this.props.navigation.navigate("EstablishmentMap")} style={{marginRight: wp(2),}}>
                            <AppView style={{ flexDirection: "row", marginLeft: wp(2) }}>
                                <AppImage
                                    style={styles.searchStyle}
                                    source={SearchIcon}
                                />
                                <AppText style={styles.searchText}>
                                    {SEARCH_ANOTHER}
                                </AppText>
                            </AppView>
                        </Touchable>
                    </AppView>
                    <AppView style={{marginVertical:hp(3)}}> 
                    <AppText style={styles.headingText}> {"Please provide your valuable feedback about the establiment to safe others form covid pandemic"} </AppText>
                    <CustomButton
                    onPress={() => this.props.navigation.navigate("VisitorReport", { ...this.props.route.params })}
                    style={{width:wp(50),height:hp(6),backgroundColor:DARKBLUE}}
                        buttonText={"Start"}
                        textstyle={{fontFamily:fontStyle.light}}
                    />
                </AppView>
                {/* <AppView style={{marginVertical:hp(3)}}>
                    <CustomButton
                    onPress={() => this.props.navigation.navigate("EmployeReport", { ...this.props.route.params })}
                    style={{width:wp(50),height:hp(6),backgroundColor:DARKBLUE}}
                        buttonText={EMPLOYEED_HERE}
                        textstyle={{fontFamily:fontStyle.light}}
                    />
                </AppView>
                 
                <AppView style={{marginVertical:hp(3)}}>
                    <CustomButton
                    onPress={() => this.props.navigation.navigate("ManagerReport", { ...this.props.route.params })}
                    style={{width:wp(50),height:hp(6),backgroundColor:DARKBLUE}}
                        buttonText={OWN_MANAGE}
                        textstyle={{fontFamily:fontStyle.light}}
                    />
                </AppView> */}
                 
                 
                   
                </Container>
                <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>
        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        PlaceView: state.reducer.language.PlaceView,
        COMMONTEXT: state.reducer.language.COMMON_TEXT,
        ReportEstablishment:state.reducer.language.ReportEstablishment,
     
    }
}

export default connect(mapStateToProps)(ReportEstablishment);