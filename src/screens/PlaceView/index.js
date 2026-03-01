import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "../../Components/Atoms/index"
import { KeyboardAvoidingView, ScrollView, Alert, Platform } from 'react-native'
import { Header, Footer, CustomButton, CustomModal } from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import { fontStyle } from '@Assets/commonFont/commonFont'
import styles from './style'
import { RED_BG_THEME, WHITE, FOOTER_BG, BLACK, BLUE_BAR, PLACE_BLUE, DARKBLUE } from '@GlobalStyles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StarIcon, SearchIcon, starFilledIcon } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { normalizeFont } from '@GlobalStyles/responsive';
import ApiRequest from '../../RestAPI/rest'
import { Loader } from "@Component/loader";

class PlaceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertStatus: "",
            favouriteStatus: false,
            favouriteModalVisible: false,
            unfavouriteModalVisible: false,
            isLoading: true,
            favList: [],
            quesList: [],

        };
    }


    componentDidMount() {

        this.setState({ alertStatusText: this.props.route.params.alertStatusText })
        console.log("DATA=======>", this.props.route.params)


    }




    render() {
        const { WE_DO_NOT } = this.props.COMMONTEXT
        const { ALERT, A, SEARCH_ANOTHER, NOT_REQUIRE_SOCIALLY_DISTANCE, FURTHER_INFORMATION, PROVIDE_REPORT, YOUR_REPORTING, BASED_ON_COVID_REPORTS, COMPLETE_REPORTS, CORRECT_ERROR } = this.props.PlaceView
        const { IS_SOCIAL_DISTANCING_REQUIRED, YES, NO, ARE_FACE_MASK_REQUIRED, PATRONS, PROVIDE_FACE_MASKS, EMPLOYEES, COVID_TESTS, ANTIBODY_TESTS, OWNER, WE_PROVIDE } = this.props.FurtherInfo
        return (
            <AppView style={{ flex: 1 }}>
                <Header />
                <Container style={{ marginBottom: hp(20.75) }}>
                    {/* <Loader
                 visible={this.state.isLoading}
                 /> */}
                    <AppView style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <AppView style={[styles.buttonView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? RED_BG_THEME : PLACE_BLUE, width: this.props.route.params.alertStatusText == "A" ? wp(65) : wp(75) }]}>
                            <AppView style={[styles.buttonContainer, { width: this.props.route.params.alertStatusText == "A" ? wp(64) : wp(74) }]}>
                                <AppText style={styles.buttonText}>
                                    {this.props.route.params.alertStatusText == "A" ? "ALERT" : this.props.route.params.alertStatusText == "S" ? "COVID Safeguards" : this.props.route.params.alertStatusText == "P" ? "Partial Safeguards" : "No Reports"}
                                </AppText>
                            </AppView>
                        </AppView>
                        {this.props.route.params.alertStatusText !== "" ? <AppView style={[styles.CircleView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? RED_BG_THEME : PLACE_BLUE }]}>
                            <AppText style={[styles.buttonText, { paddingVertical: hp(-5.2), }]}>
                                {/* {A} */}
                                {this.props.route.params.alertStatusText}
                            </AppText>
                        </AppView> : <AppView style={{ width: wp(9) }} />}
                    </AppView>
                    <AppView style={{ flexDirection: "row", alignItems: "center", marginVertical: hp(3), justifyContent: "space-around" }}>
                        <Touchable onPress={() => this.handlefavourite()}>
                            <AppImage
                                style={styles.starStyle}
                                source={this.state.favouriteStatus ? starFilledIcon : StarIcon}
                            />
                        </Touchable>
                        <ScrollView
                            nestedScrollEnabled
                            style={[styles.MiddleView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? PLACE_BLUE : DARKBLUE }]}>

                            <AppText style={styles.middleViewTextStyle}>
                                {this.props.route.params.title}
                            </AppText>
                            <AppText style={styles.middleViewTextStyle}>
                                {this.props.route.params.address}
                            </AppText>



                            {this.props.route.params.permanently_closed ?
                                <AppText style={styles.middleViewTextStyle}>
                                    {`Permanently Closed `}
                                </AppText> :

                                this.props.route.params.noOpenStatus ?
                                    <AppText style={styles.middleViewTextStyle}>
                                        {this.props.route.params.open_now ? "Open Now" : "Currently Closed"}
                                    </AppText> : null

                            }
                        </ScrollView>
                        <Touchable onPress={() => this.props.navigation.navigate("EstablishmentMap")}>
                            <AppView style={{ flexDirection: "row", }}>
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

                    {this.props.route.params.alertStatusText === "" ? null :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            style={[styles.redbgView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? RED_BG_THEME : PLACE_BLUE }]}>
                            <AppText style={styles.textStyleResult}>
                                {/* {ALERT} */}
                                {this.props.route.params.alertStatusText == "A" ? "ALERT" : this.props.route.params.alertStatusText == "S" ? "Safeguards" : this.props.route.params.alertStatusText == "P" ? "Safeguards" : "No Reports"}
                            </AppText>
                            {
                                this.state.quesList.map((item, index) => {
                                    console.log("item===>", item)
                                    if (item.yes) {
                                        return (
                                            <AppView>
                                                <AppText style={styles.requiredtextStyle}>
                                                    {item.question}
                                                </AppText>
                                                <AppView style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                    <AppView style={styles.boxView}>
                                                        <AppText style={{ textAlign: "center" }}>{item.no}</AppText>
                                                    </AppView>
                                                    <AppView style={styles.boxView}>
                                                        <AppText style={{ textAlign: "center" }}>{item.yes}</AppText>
                                                    </AppView>
                                                </AppView>
                                                <AppView style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                    <AppText style={{ fontFamily: fontStyle.light }}>
                                                        {YES}
                                                    </AppText>
                                                    <AppText style={{ fontFamily: fontStyle.light }}>
                                                        {NO}
                                                    </AppText>
                                                </AppView>
                                            </AppView>
                                        )
                                    }
                                    else {

                                        return (
                                            <AppView>
                                                <AppText style={styles.requiredtextStyle}>
                                                    {item.question}
                                                </AppText>
                                            </AppView>
                                        )
                                    }

                                })
                            }








                        </ScrollView>
                    }
                    {this.props.route.params.alertStatusText != "" ?
                        <AppView style={{}}>
                            <CustomButton
                                onPress={() => this.props.navigation.navigate("FurtherInfo", { ...this.props.route.params })}
                                style={{ width: wp(50), height: hp(5), backgroundColor: DARKBLUE }}
                                buttonText={FURTHER_INFORMATION}
                            />
                        </AppView> : null}
                    <AppView style={{ marginVertical: hp(2) }}>
                        <CustomButton
                            onPress={() => this.props.navigation.navigate("ReportEstablishment", { ...this.props.route.params })}
                            style={{ width: wp(50), height: hp(6), backgroundColor: RED_BG_THEME }}
                            textstyle={{ fontSize: normalizeFont(25) }}
                            buttonText={PROVIDE_REPORT}
                        />
                    </AppView>

                    <AppView style={{ marginTop: hp(2), alignItems: "center", width: wp(87), marginLeft: wp(6) }}>
                        <AppText style={{ textAlign: "center", color: DARKBLUE }}>
                            {YOUR_REPORTING}
                        </AppText>
                    </AppView>
                    <AppView style={styles.CommanText}>
                        <AppText style={styles.CommanText}>
                            {WE_DO_NOT}
                        </AppText>
                    </AppView>
                    <AppView style={{ flexDirection: "row" }}>
                        <AppText style={{ marginLeft: wp(3), color: DARKBLUE }}
                        >{"*"}</AppText>
                        <AppText style={styles.basedstyle}>
                            {BASED_ON_COVID_REPORTS}
                        </AppText>
                    </AppView>
                    <AppText style={styles.completestyle}>
                        {COMPLETE_REPORTS}
                    </AppText>

                    <CustomModal
                        isModalVisible={this.state.favouriteModalVisible}
                        onPress={() => this.setState({ favouriteModalVisible: !this.state.favouriteModalVisible })}
                        text={"Successfully added"}
                    />

                    <CustomModal
                        isModalVisible={this.state.unfavouriteModalVisible}
                        onPress={() => this.setState({ unfavouriteModalVisible: !this.state.unfavouriteModalVisible })}
                        text={"Successfully removed"}
                    />
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
        FurtherInfo: state.reducer.language.FurtherInfo,
        token: state.AuthReducer.Token
    }
}

export default connect(mapStateToProps)(PlaceView);