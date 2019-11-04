import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, combineReducers} from "redux";
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer, {loginSaga as rootSaga} from '../ducks/authSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export const reducer = combineReducers({
   router: connectRouter(history),
   auth: authReducer
});

const enhancer = applyMiddleware(
   routerMiddleware(history),
   sagaMiddleware
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
