import {take, put} from 'redux-saga/effects'

import {Auth} from "../../service";

/**
 * Constants
 */

const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
const LOGIN_FAILURE: string = 'LOGIN_FAILURE';

const initialState = {
   loadingOfForm: false,
   userData: null,
   errorMessage: null,
};

/**
 * Reducer
 */

export default (state = initialState, action: { type: string; payload: any; error: any | string; }) => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return {
            ...state,
            loadingOfForm: true,
            errorMessage: null
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

export const login = (dataOfForm: any) => ({
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
         const response = Auth.login(action.payload);

         if (response.data.status === 'SUCCESS') {
            console.log(response);

            yield put({
               type: LOGIN_SUCCESS,
               payload: response.data
            });
         } else {
            yield put({
               type: LOGIN_FAILURE,
               payload: response.statusText
            })
         }
      } catch (error) {
         yield put({
            type: LOGIN_FAILURE,
            payload: error
         })
      }
   }
}
