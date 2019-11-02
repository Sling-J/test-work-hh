import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer, {loginSaga} from '../components/ducks/authSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
   router: connectRouter(history),
   authReducer
});

const enhancer = compose(
   applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
   ),
   window.__REDUX_DEVTOOLS_EXTENSION__ &&
   window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(loginSaga);

export default store;
