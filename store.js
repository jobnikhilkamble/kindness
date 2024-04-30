import {combineReducers, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
 import AsyncStorage from '@react-native-community/async-storage';
import {auth} from './Reducers/auth';
import {rawData} from './Reducers/rawData';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  blacklist: ['rawData'],
};

const reducers = combineReducers({
  rawData,
  auth,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export default store;
export const persistor = persistStore(store);
