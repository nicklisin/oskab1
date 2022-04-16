import {ADD_SUPPLIER, DELETE_SUPPLIER, GET_SUPPLIERS} from '../actions/types.js'

const initialState = {
    suppliers: []
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_SUPPLIERS:
            return {
                ...state,
                suppliers: action.payload
            }
        case DELETE_SUPPLIER:
            return {
                ...state,
                suppliers: state.suppliers.filter(supplier => supplier.id !== action.payload)
            }
        case ADD_SUPPLIER:
            return {
                ...state,
                suppliers: [...state.suppliers, action.payload]
            }
        default:
            return state;
    }
}
