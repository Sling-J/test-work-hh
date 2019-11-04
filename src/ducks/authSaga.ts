import {ILoginParams, AuthInitialState} from "../models";
import {take, put, call} from 'redux-saga/effects'
import {Auth} from "../service/service";

/**
 * Constants
 */

const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
const LOGIN_FAILURE: string = 'LOGIN_FAILURE';

const initialState: AuthInitialState = {
   loadingOfForm: false,
   errorMessage: null,
   userData: null,
};

/**
 * Reducer
 */

export default (state = initialState, action: { type: any; payload: any; error: any; }): AuthInitialState => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return {
            ...state,
            loadingOfForm: true,
            errorMessage: null,
         };

      case LOGIN_SUCCESS:
         return {
            ...state,
            loadingOfForm: false,
            errorMessage: null,
            userData: action.payload
         };

      case LOGIN_FAILURE:
         return {
            ...state,
            loadingOfForm: false,
            errorMessage: action.error,
            userData: null
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const login = (dataOfForm: ILoginParams) => ({
   type: LOGIN_REQUEST,
   payload: dataOfForm
});

/**
 * Sagas
 */

export function* loginSaga() {
   while (true) {
      const action = yield take(LOGIN_REQUEST);

      try {
         const response = yield call(Auth.login, action.payload);

         if (response.data.status === 'SUCCESS') {
            localStorage.setItem('ACCESS_TOKEN', response.data.jwt);

            yield put({
               type: LOGIN_SUCCESS,
               payload: response.data
            });
         }
      } catch (error) {
         yield put({
            type: LOGIN_FAILURE,
            error: error.statusText
         })
      }
   }
}
