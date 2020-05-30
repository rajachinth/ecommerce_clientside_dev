import { ADDSECRET, SHOW_LOAD, HIDE_LOAD, SHOPPING_HIDE_LOAD, SHOPPING_SHOW_LOAD } from './coreaction';

export interface LogState
{
    userAuthToken:String;
    show:Boolean;
    shoppingServer:Boolean;
}   
export const LogStateInitState:LogState={userAuthToken:'secretkeyToken',show:false,shoppingServer:false};

export function LogStateStateReducer(state:LogState=LogStateInitState,action):LogState
{
    switch(action.type)
    {
        case ADDSECRET:
            return Object.assign({},state,{userAuthToken:action.data.token});
        case SHOW_LOAD:
            return Object.assign({},state,{show:true});
        case HIDE_LOAD:
            return Object.assign({},state,{show:false});
        case SHOPPING_SHOW_LOAD:
            return Object.assign({},state,{shoppingServer:true});
        case SHOPPING_HIDE_LOAD:
            return Object.assign({},state,{shoppingServer:false});
    }
    return state;   
}