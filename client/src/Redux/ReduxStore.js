import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './Reducers/AuthReducer';
import ObjRed from './Reducers/ObjRed';
import AppReducer from './Reducers/AppReducer';

const reducers = combineReducers({
  auth: AuthReducer,
  obj: ObjRed,
  app: AppReducer,
  form: formReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;