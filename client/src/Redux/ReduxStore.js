import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from "./Reducers/AuthReducer";
import ObjectReducer from "./Reducers/ObjectReducer";
import AppReducer from "./Reducers/AppReducer";

const reducers = combineReducers({
    auth: AuthReducer,
    object: ObjectReducer,
    app: AppReducer,
    form: formReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;