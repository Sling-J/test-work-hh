const user = {
   email: 'nurel32@gmail.com',
   username: 'Nurel',
   password: '123'
};

const fakeLogin = (data: object) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if ((data.email === user.email) && (data.password === user.password)) {

         } else {

         }
      }, 500)
   })
};

export const auth = {
   login: (dataOfForm: object) => fakeLogin(dataOfForm)
};
