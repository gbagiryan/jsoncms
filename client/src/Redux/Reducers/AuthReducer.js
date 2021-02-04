import {AuthApi} from "../../API/api";
import {setErrorMsg, setSuccessMsg} from "./AppReducer";

const AUTH_SET_USER_DATA = 'AUTH_SET_USER_DATA';
const AUTH_SET_IS_AUTHED = 'AUTH_SET_IS_AUTHED';

const initialState = {
    authedUserData: null,
    isAuthed: false
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_USER_DATA:
            return {
                ...state,
                authedUserData: action.userData
            }
        case AUTH_SET_IS_AUTHED:
            return {
                ...state,
                isAuthed: action.isAuthed
            }
        default:
            return state;
    }
};

//action creators
const setUserData = (userData) => ({type: AUTH_SET_USER_DATA, userData});
const setIsAuthed = (isAuthed) => ({type: AUTH_SET_IS_AUTHED, isAuthed});

//thunks
export const signIn = (username, password) => async (dispatch) => {
    try {
        const res = await AuthApi.signIn(username, password);
        dispatch(setUserData(res.data));
        dispatch(setIsAuthed(true));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};
export const signOut = () => async (dispatch) => {
    try {
        await AuthApi.signOut();
        dispatch(setUserData(null));
        dispatch(setIsAuthed(false));
    } catch (err) {
        console.log(err);
    }
};

export const signUp = (username, password) => async (dispatch) => {
    try {
        const res = await AuthApi.signUp(username, password);
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};
export const verifyAuth = () => async (dispatch) => {
    try {
        const res = await AuthApi.verifyAuth();
        if (res.data) {
            dispatch(setIsAuthed(true));
        } else {
            dispatch(setIsAuthed(false));
        }
    } catch (err) {
        console.log(err);
    }
}
export default AuthReducer;
