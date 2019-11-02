import React from 'react';
// @ts-ignore
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import Auth from "./components/Auth";

import store, {history} from "./redux";

const App: React.FC = () => {
   return (
      <Provider store={store}>
         <ConnectedRouter history={history}>
            <Auth/>
         </ConnectedRouter>
      </Provider>
   )
};

export default App;
