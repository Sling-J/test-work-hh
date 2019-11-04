import {ILoginParams, ILoginResponse} from "../models";

const user = {
   email: 'nurel32@gmail.com',
   username: 'Nurel',
   password: '123'
};

const jwt = '86fasfgfsogHGad';

export const login = (data: ILoginParams): Promise<ILoginResponse> => {
   return new Promise<ILoginResponse>((resolve, reject) => {
      setTimeout(() => {
         if ((data.email === user.email) && (data.password === user.password)) {
            resolve({
               status: 200,
               data: {
                  status: 'SUCCESS',
                  email: user.email,
                  username: user.username,
                  jwt: jwt
               }
            });
         } else {
            reject({
               status: 401,
               statusText: 'Unauthorized'
            });
         }
      }, 500)
   })
};
