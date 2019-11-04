import {ILoginParams} from "../models";
import {login} from "./fakeApi";

export const Auth = {
   login: (dataOfForm: ILoginParams) => login(dataOfForm)
};


