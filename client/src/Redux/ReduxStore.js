import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import AuthReducer from "./Reducers/AuthReducer";

const reducers = combineReducers({
    auth: AuthReducer
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;