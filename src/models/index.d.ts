import {reducer} from "../redux";

export interface ILoginParams {
   email: string;
   password: string;
}

export interface ILoginResponse {
   status: number,
   statusText?: string
   data: IUserData
}

export interface IUserData {
   status: string,
   email: string,
   username: string,
   jwt: string,
}

export type AuthInitialState = Readonly <{
   loadingOfForm: boolean;
   userData: IUserData | null;
   errorMessage: string | {} | null;
}>

export type AppState = ReturnType<typeof reducer>;
