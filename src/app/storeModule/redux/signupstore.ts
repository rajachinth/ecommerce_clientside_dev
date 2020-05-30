import { SIGNUPDATA } from './coreaction'

export interface SignUpState
{
    username:string,
    mobile:number,
    uniqueID:string,
    membership:string,
    premiumcost:number
}

export const SIGNUPSTATE:SignUpState={
    username:null,
    mobile:null,
    uniqueID:null,
    membership:null,
    premiumcost:null,
}

export function signUpStateReducer(state:SignUpState=SIGNUPSTATE,action):SignUpState
{
    switch(action.type)
    {
        case SIGNUPDATA:
            return Object.assign({},
                                {username:action.data.username,
                                 mobile:action.data.mobile,
                                 uniqueID:action.data.uniqueID,
                                 membership:action.data.membership,
                                 premiumcost:action.data.premiumcost});
        default:
            return state;
    }
}