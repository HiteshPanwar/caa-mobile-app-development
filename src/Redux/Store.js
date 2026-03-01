import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";
import RootReducer from "./Reducer/index";
import AsyncStorage from "@react-native-community/async-storage"
import { persistStore, persistReducer } from 'redux-persist';
const middleware = applyMiddleware(thunk);

const persistConfig = {
    key : 'root',
    storage : AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig,RootReducer);

const store = createStore(persistedReducer,compose(middleware));

let persistor = persistStore(store);

export{
    store,
    persistor,
};
