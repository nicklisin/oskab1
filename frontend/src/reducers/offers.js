import {ADD_OFFER, GETTING_OFFERS, GET_OFFER, DELETE_OFFER, GET_CATEGORIES, GET_OFFERS, UPDATE_OFFER} from '../actions/types.js'

const initialState = {
    offers: [],
    isLoading: false,
    count: 1,
    next: '',
    previous: null
}

export default function (state = initialState, action){
    switch (action.type){
        case GETTING_OFFERS:
            return {
                ...state,
                isLoading: true
            }
        case GET_OFFERS:
            return {
                ...state,
                offers: action.payload.results,
                isLoading: false,
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous
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
