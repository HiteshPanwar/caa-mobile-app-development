import React from 'react';
import {AUTH_ACTION} from '../Action/ActionType'

const initialState={
    Token:"",
    Userdetails:{}
}

export const AuthReducer=(state=initialState, action)=>{
    console.log("AuthReducer===>", console.log(action))
    switch (action.type) {
        case AUTH_ACTION.TOKEN_SAVE:
            return {
                ...state,
                Token:action.payload
            }
            case AUTH_ACTION.SAVE_USER_DETAILS:
                return {
                    ...state,
                    Userdetails:action.payload
                }
            case "persist/REHYDRATE":
                if(action.payload!=undefined){
            return {
                ...state,
                ...action.payload.AuthReducer
            }
        }
        else{
            return {
                ...state
            }
        }
        default:
            return{
                ...state
            }
}
}