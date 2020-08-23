import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: userId
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatchEvent => {
        dispatchEvent(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAscnE069mzy4Naffkya8i1pNdoEuJzK9o';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:verifyPassword?key=AIzaSyAscnE069mzy4Naffkya8i1pNdoEuJzK9o'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {

                dispatch(authFail(err.response.data.error));
            })
    };
};