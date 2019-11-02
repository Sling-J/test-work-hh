const user = {
   email: 'nurel32@gmail.com',
   username: 'Nurel',
   password: '123'
};

const fakeLogin = (data: any) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if ((data.email === user.email) && (data.password === user.password)) {
            const response = {
               status: 200,
               data: {
                  status: 'SUCCESS',
                  email: user.email,
                  username: user.username,
                  jwt: '86fasfgfsogHGad'
               }
            };

            resolve(response);
         } else {
            const response = {
               status: 401,
               statusText: 'Unauthorized'
            };

            reject(response);
         }
      }, 500)
   })
};

export const Auth: object = {
   login: (dataOfForm: object) => fakeLogin(dataOfForm)
};


