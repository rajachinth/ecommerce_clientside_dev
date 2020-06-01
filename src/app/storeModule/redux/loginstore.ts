import { USERDATA } from './coreaction';

export interface LoginState {
    username: string;
    subscription: boolean;
    admin: boolean;
    loggedin: boolean;
    uniqueID: string;
}

export const LOGINSTATE: LoginState = {
    username: null,
    subscription: null,
    admin: null,
    loggedin: false,
    uniqueID: null
};

export function loginStateReducer(state: LoginState= LOGINSTATE, action): LoginState {
    switch (action.type) {
        case USERDATA:
            return Object.assign({}, state, {username: action.data.name,
                subscription: action.data.subscription, admin: action.data.admin,
                loggedin: action.data.loggedin, uniqueID: action.data.uniqueID});

        default:
            return state;
    }

}
