import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Login} from '../Redux/Action'

const Review = () => {
    const [contoh, setContoh] = useState(0)

    const dispatch = useDispatch()

    const logged = useSelector((state)=> {
        return {
            logged: state.useDispatch,
            role: state.auth.role
        }
    })

    const loginHooks = () => {
        dispatch(Login({
            username: 'lianeddy',
            email: 'lianeddy@gmail.com',
            role: 'admin',
            password: '123'
        }))
        console.log(logged)
    }

    return (  
        <div>
            <input type="button" value="-" onClick={() => setContoh(contoh-1)} />
            {contoh}
            <input type="button" value="+" onClick={() => setContoh(contoh+1)} />
            <button onClick={loginHooks}>login jancuk</button>
        </div>
    );
}
 
export default Review;