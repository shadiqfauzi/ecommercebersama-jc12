import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'
import Swal from 'sweetalert2'

// export const Login = (data) => {
//     return{
//         type : 'LOGIN',
//         payload : data
//     }
// }

export const Login = (username, password) => {
    return(dispatch) => {
        const encode = encodeURIComponent(password)
        Axios.get(`${API_URL}/users?username=${username}&password=${encode}`)
        .then(res => {
            if(res.data[0]){
                localStorage.setItem('token', JSON.stringify({
                    username: res.data[0].username, 
                    password: res.data[0].password,
                    id: res.data[0].id,
                    role: res.data[0].role
                }))
                dispatch({
                    type: 'LOGIN',
                    payload : res.data[0]
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'Wrong username / password.'
                })
            }
        })
        .catch(err => {
            dispatch({
                type: 'LOGOUT'
            })
        })
    }
}

export const keepLogin = (token) => {
    return(dispatch) => {
        token = JSON.parse(token)
        let { username, password } = token
        const encode = encodeURIComponent(password)
        Axios.get(`${API_URL}/users?username=${username}&password=${encode}`)
        .then(res => {
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'LOGOUT'
            })
        })
    }
}

export const Logout = () => {
    return{
        type : 'LOGOUT'
    }
}