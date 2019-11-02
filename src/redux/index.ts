import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, combineReducers} from "redux";
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer, {loginSaga} from '../components/ducks/authSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
   router: connectRouter(history),
   authReducer
});

const enhancer = applyMiddleware(
   routerMiddleware(history),
   sagaMiddleware
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(loginSaga);

export default store;
