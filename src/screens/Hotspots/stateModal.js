import React from 'react'
import { Text, View, TouchableOpacity, Modal,FlatList,Image,Dimensions } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'
import { RED_BG_THEME } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
const { width, height } = Dimensions.get("window");

const StateModal =(props) =>(

           
            <Modal
            style={{ height: height / 2 }}
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    opacity: 0.8
                }}>
                <View style={{
                    height: height / 2,
                    width: wp("70%"), justifyContent: "center",
                    alignSelf: "center", alignItems: "center",
                    backgroundColor: 'white', paddingVertical: 15,
                    borderWidth: 1
                }}>
                    <FlatList
                        data={props.data}
                        onRequestClose={() => console.log("modal has been closeds")}
                        renderItem={({ item, index }) =>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={ () =>props.onPress(item)}
                                    style={{
                                        flexDirection: 'row',
                                        width: wp("70%"),
                                        marginVertical: wp(2),justifyContent:'center'
                                    }}
                                >
                                    <View style={{ marginHorizontal: wp(2),alignSelf:'center',justifyContent:'center' }}>
                                        <Text style={{ fontSize: 15 ,fontFamily:fontStyle.medium,fontSize: normalizeFont(20),alignSelf:'center',textAlign:'center'}}>{item.displayName}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => {
                            return <View style={{
                                height: 1,
                                backgroundColor: "grey", width: wp("70%")
                            }} />
                        }}
                        CancelModal={props.CancelModal}
                    />
                    <TouchableOpacity onPress={props.cancelPress}
                        style={{ borderRadius: 20, width: wp("50%"),backgroundColor:RED_BG_THEME }}>
                      

                            <Text style={{
                                alignSelf: "center",
                                marginVertical: 10,
                                fontFamily:fontStyle.light,
                                fontSize: 20,
                                color: 'white'
                            }}>{"Cancel"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
       
    )
        
    export {
        StateModal
    }