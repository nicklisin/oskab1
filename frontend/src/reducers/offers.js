import {ADD_OFFER, GET_OFFER, DELETE_OFFER, GET_CATEGORIES, GET_OFFERS, UPDATE_OFFER} from '../actions/types.js'

const initialState = {
    offers: []
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_OFFERS:
            return {
                ...state,
                offers: action.payload
            }
        case GET_OFFER:
            return {
                ...state,
                offer: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case DELETE_OFFER:
            return {
                ...state,
                offers: state.offers.filter(offer => offer.id !== action.payload)
            }
        case ADD_OFFER:
            return {
                ...state,
                offers: [...state.offers, action.payload]
            }
        case UPDATE_OFFER:
            const updatedOffers = state.offers.map(item => {
                if(item.id === action.payload.id){
                    return {...item, ...action.payload}
                }
                return item
            })
            return {
                ...state,
                offers: updatedOffers
            }
        default:
            return state;
    }
}
