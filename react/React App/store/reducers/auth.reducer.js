import * as types from '../types';
import { localStorageService } from '../../services';

const user = localStorageService.getUserDetail();
const initialState = user ? { ...user, loggedIn: true } : { loggedIn: false };

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.LOGIN_SUCCESS:
            debugger    
            return {
                user: payload,
                loggedIn: true
            };

        case types.LOGOUT:
            return {
                loggedIn: false
            };

        default:
            return state;
    }
}

export default authReducer;