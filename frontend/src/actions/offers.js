import axios from "axios";
import {GET_OFFERS, GET_OFFER, DELETE_OFFER, ADD_OFFER, UPDATE_OFFER, GET_CATEGORIES, GETTING_OFFERS} from "./types";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

// GET OFFERS
export const getOffers = (page)=> (dispatch, getState) => {
    dispatch({type:GETTING_OFFERS})
    let url = `/api/offers/`
    if(page){
        url = url+`?page=${page}`
    }
    axios.get(url, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_OFFERS,
                payload: res.data
            })

        }).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}

// GET OFFER
export const getOffer = (id)=> (dispatch, getState) => {
    axios.get(`/api/offers/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_OFFER,
                payload: res.data
            })
        }).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD OFFER
export const addOffer = offer => (dispatch, getState) => {
    axios.post('/api/offers/', offer, tokenConfig(getState))
        .then(res => {
            dispatch(returnErrors("", null))
            dispatch(createMessage({addOffer: 'Предложение добавлено'}))
            dispatch({
                type: ADD_OFFER,
                payload: res.data
            })
        }).catch(err=> {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch(createMessage({addOfferFail: 'Предложение не добавлено'}))
        })
}

// UPDATE OFFER
export const updateOffer = (id, offer) => (dispatch, getState) => {
    axios.patch(`/api/offers/${id}/`, offer, tokenConfig(getState))
        .then(res => {
            dispatch(returnErrors("", null))
            dispatch(createMessage({addOffer: 'Предложение изменено'}))
            dispatch({
                type: UPDATE_OFFER,
                payload: res.data
            })
        }).catch(err=> {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

// DELETE OFFER
export const deleteOffer = (id)=> (dispatch, getState) => {
    axios.delete(`/api/offers/${id}/`, tokenConfig(getState))
        .then(() => {
            dispatch(createMessage({deleteOffer: 'Предложение удалено'}))
            dispatch({
                type: DELETE_OFFER,
                payload: id
            })
        }).catch(err=>console.log(err))
}

// GET CATEGORIES
export const getCategories = ()=> (dispatch, getState) => {
    axios.get('/api/categories/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        }).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}
