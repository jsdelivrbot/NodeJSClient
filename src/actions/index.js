import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE} from './types'

const ROOT_URL = 'http://localhost:3090';


export function signinUser({email, password}) {
    //redux thunk grunts access to dispatch by allowing us to return function in action creators. Not object as always.
    //  With help of redux thunk we want to dispatch multiple actions and add some logic to them
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(resp => {
                //if request is good
                    //-update state to ondicate user is autheticated
                    dispatch({type: AUTH_USER})


                    //-save JWT token in local storage
                    localStorage.setItem('token', resp.data.token);

                    // -redirect to /feature
                    browserHistory.push('/feature');
            })
            .catch(err=>{
                //if reuqest is bad
                dispatch(authError('Bad login info'))
                //-redirect to /start

            })
    }
}

export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err
    }
}

export function signoutUser() {
    return (dispatch) =>{
        localStorage.removeItem('token');
        dispatch({type: UNAUTH_USER})
    }
}

export function signupUser({email, password}) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(resp => {
                //if request is good
                //-update state to ondicate user is autheticated
                dispatch({type: AUTH_USER});

                //-save JWT token in local storage
                localStorage.setItem('token', resp.data.token);

                // -redirect to /feature
                browserHistory.push('/feature');
            })
            .catch(()=>{
                //if reuqest is bad
                dispatch(authError('Email exists'))
                //-redirect to /start

            })
    }
}

//request with token for identification on server
export function fetchMessage() {
    return (dispatch) => {
        axios.get(ROOT_URL, {headers: {authorization: localStorage.getItem('token')}})
        .then(res=>{
            console.log(res)
            dispatch({type: FETCH_MESSAGE, payload: res.data.message})
        })
    }
}
