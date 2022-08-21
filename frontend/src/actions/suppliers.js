import axios from "axios";
import {GET_SUPPLIERS, DELETE_SUPPLIER, ADD_SUPPLIER} from "./types";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

// GET SUPPLIERS
export const getSuppliers = ()=> (dispatch, getState) => {
    axios.get('/api/suppliers/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SUPPLIERS,
                payload: res.data
            })
        }).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD SUPPLIER
export const addSupplier = supplier => (dispatch, getState) => {
    axios.post('/api/suppliers/', supplier, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addSupplier: 'Компания добавлена'}))
            dispatch({
                type: ADD_SUPPLIER,
                payload: res.data
            })
        }).catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE SUPPLIER
export const deleteSupplier = (id)=> (dispatch, getState) => {
    axios.delete(`/api/suppliers/${id}/`, tokenConfig(getState))
        .then(() => {
            dispatch(createMessage({deleteSupplier: 'Компания удалена'}))
            dispatch({
                type: DELETE_SUPPLIER,
                payload: id
            })
        }).catch(err=>console.log(err))
}
