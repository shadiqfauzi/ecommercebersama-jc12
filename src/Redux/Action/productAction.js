import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';


export const fetchProduct = () => {
    return(dispatch) => {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products`)
        .then(res => {
            dispatch({
                type: 'FETCH_DATA_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
    }
}

export const fetchProductId = (id) => {
    return(dispatch) => {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products/${id}`)
        .then(res => {
            dispatch({
                type: 'FETCH_ID_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
    }
}

export const addProduct = (obj) => {
    return(dispatch) => {
        Axios.post(`${API_URL}/products/`, obj)
        .then(res => {
            Axios.get(`${API_URL}/products`)
            .then(res => {
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'FETCH_DATA_FAILED'
                })
            })
        })
        .catch(err => {
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
    }
}

export const editProduct = (id, obj) => {
    return(dispatch) => {
        Axios.patch(`${API_URL}/products/${id}`, obj)
        .then(res => {
            Axios.get(`${API_URL}/products`)
            .then(res => {
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'FETCH_DATA_FAILED'
                })
            })
        })
        .catch(err => {
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
    }
}