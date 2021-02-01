import {AuthApi} from "../../API/api";

const AUTH_SET_USER_DATA = 'AUTH_SET_USER_DATA';

const initialState = {
    authedUserData: null,
    posts: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action) {
        case AUTH_SET_USER_DATA:
            return {
                ...state,
                authedUserData: action.userData
            }
        default:
            return state;
    }
};

//action creators
const setUserData = (userData) => ({type: AUTH_SET_USER_DATA, userData})

//thunks
export const signIn = (username, password) => async (dispatch) => {
    try {
        const res = await AuthApi.signIn(username, password);
        dispatch(setUserData(res.data));
    } catch (err) {
        console.log(err);
    }
};
export const signOut = () => async (dispatch) => {
    try {
        const res = await AuthApi.signOut();
        dispatch(setUserData(null));
    } catch (err) {
        console.log(err);
    }
};

export const signUp = (username, password) => async (dispatch) => {
    try {
        await AuthApi.signUp(username, password);
    } catch (err) {
        console.log(err);
    }
};

export default AuthReducer;
