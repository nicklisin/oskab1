import axios from "axios";
import {returnErrors, } from "./messages";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGOT_REQUEST_SUCCESS,
    FORGOT_REQUEST_FAIL,
    FORGOT_REQUEST_IN_PROGRESS,
    PASS_RESET_REQUEST_SUCCESS,
    PASS_RESET_REQUEST_FAIL,
    PASS_RESET_REQUEST_IN_PROGRESS
} from './types'

//Check token & load user
export const loadUser = ()=> (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING})

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })

}


// LOGIN USER
export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })

}


// REGISTER USER
export const register = ({username, email, password}) => dispatch => {

    // Headers
    const config = {headers: {'Content-Type': 'application/json'}}

    // Request body
    const body = JSON.stringify({ username, email, password })

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}


// LOGOUT USER
export const logout = ()=> (dispatch, getState) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}

// Setup config for token

export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = { headers: {'Content-Type': 'application/json'} }

    // If token, add to header config
    if(token){ config.headers['Authorization'] = `Token ${token}` }

    return config
}


// FORGOT PASSWORD
export const forgot = (email) => dispatch => {

    dispatch({type: FORGOT_REQUEST_IN_PROGRESS})

    // Headers
    const config = {
        headers: {'Content-Type': 'application/json'}
    }

    // Request body
    const body = JSON.stringify({ email })

    axios.post('/api/password_reset/', body, config)
        .then(res => {
            dispatch({
                type: FORGOT_REQUEST_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: FORGOT_REQUEST_FAIL
            })
        })

}

// RESET PASSWORD
export const reset = (password, token) => dispatch => {

    dispatch({type: PASS_RESET_REQUEST_IN_PROGRESS})

    // Headers
    const config = {
        headers: {'Content-Type': 'application/json'}
    }

    // Request body
    const body = JSON.stringify({ password, token })

    axios.post('/api/password_reset/confirm/', body, config)
        .then(res => {
            dispatch({
                type: PASS_RESET_REQUEST_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: PASS_RESET_REQUEST_FAIL
            })
        })

}
