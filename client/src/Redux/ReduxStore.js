import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from "./Reducers/AuthReducer";
import PostReducer from "./Reducers/PostReducer";

const reducers = combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    form: formReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;