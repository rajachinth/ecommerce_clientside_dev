import { LoginState, LOGINSTATE, loginStateReducer } from './loginstore';
import { combineReducers } from 'redux';
import { SignUpState, SIGNUPSTATE, signUpStateReducer } from './signupstore';
import { CartStore, CARTINITSTATE, CartStateReducer } from './cartstore';
import { ORDERINITSATE, OrderState, orderStateReducer } from './orderstore';
import { LogState, LogStateInitState, LogStateStateReducer } from './logstore';


export interface RootStoreState {
    loginstate: LoginState;
    signupstate: SignUpState;
    cartstate: CartStore;
    orderstate: OrderState;
    logstate: LogState;
}

export const INITIALSTATE: RootStoreState = {

    loginstate: LOGINSTATE,
    signupstate: SIGNUPSTATE,
    cartstate: CARTINITSTATE,
    orderstate: ORDERINITSATE,
    logstate: LogStateInitState
};

export const rootReducer = combineReducers({
    loginstate: loginStateReducer,
    signupstate: signUpStateReducer,
    cartstate: CartStateReducer,
    orderstate: orderStateReducer,
    logstate: LogStateStateReducer
});
