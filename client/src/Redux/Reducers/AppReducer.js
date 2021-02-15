import { verifyAuth } from './AuthReducer';

const APP_SET_INITIALIZED = 'APP_SET_INITIALIZED';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const initialState = {
  isInitialized: false,
  successMsg: '',
  errorMsg: ''
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_INITIALIZED:
      return {
        ...state,
        isInitialized: true
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMsg: action.successMsg
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        successMsg: '',
        errorMsg: '',
      };
    default:
      return state;
  }
};

//action creators
const setInitialized = () => ({ type: APP_SET_INITIALIZED });
export const setErrorMsg = (errorMsg) => ({ type: SET_ERROR_MESSAGE, errorMsg });
export const setSuccessMsg = (successMsg) => ({ type: SET_SUCCESS_MESSAGE, successMsg });
export const clearMessages = () => ({ type: CLEAR_MESSAGES });

//thunks
export const initializeApp = () => async (dispatch) => {
  await dispatch(verifyAuth());
  dispatch(setInitialized());
};
export default AppReducer;
