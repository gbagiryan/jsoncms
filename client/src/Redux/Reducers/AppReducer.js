import {verifyAuth} from "./AuthReducer";

const APP_SET_INITIALIZED = 'APP_SET_INITIALIZED';

const initialState = {
    isInitialized: false
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_SET_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
};
//action creators
const setInitialized = () => ({type: APP_SET_INITIALIZED});
//thunks
export const initializeApp = () => async (dispatch) => {
    await dispatch(verifyAuth());
    dispatch(setInitialized());
};
export default AppReducer;
