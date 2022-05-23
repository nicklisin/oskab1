import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    FORGOT_REQUEST_SUCCESS,
    FORGOT_REQUEST_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGOT_REQUEST_IN_PROGRESS,
    PASS_RESET_REQUEST_SUCCESS,
    PASS_RESET_REQUEST_FAIL,
    PASS_RESET_REQUEST_IN_PROGRESS
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isSending: false,
    isSended: false
}

export default function (state = initialState, action){
    switch (action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case FORGOT_REQUEST_SUCCESS:
             return {
                ...state,
                isSending: false,
                isSended: true
            }
        case FORGOT_REQUEST_FAIL:
             return {
                ...state,
                isSending: false,
                isSended: false
            }
        case FORGOT_REQUEST_IN_PROGRESS:
             return {
                ...state,
                isSending: true
            }
        case PASS_RESET_REQUEST_SUCCESS:
             return {
                ...state,
                isPassChanging: false,
                isPassChanged: true
            }
        case PASS_RESET_REQUEST_FAIL:
             return {
                ...state,
                isPassChanging: false,
                isPassChanged: false
            }
        case PASS_RESET_REQUEST_IN_PROGRESS:
             return {
                ...state,
                isPassChanging: true
            }

        default:
            return state;
    }
}
