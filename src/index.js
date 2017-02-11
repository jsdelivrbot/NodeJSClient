import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router'
import reduxThunk from 'redux-thunk';

import App from './components/app';
import signin from './components/auth/signin';
import signout from './components/auth/signout';
import signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/Welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

//check if user is already authentificated (like after page refresh)
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token');
if(token) {
    //we need to update app state
    store.dispatch({type: AUTH_USER})
}


ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App} >
              <IndexRoute component={Welcome} />
              <Route path="/signin" component={signin} />
              <Route path="/signout" component={signout} />
              /*<Route path="/signup" component={signup} />
              <Route path="/feature" component={RequireAuth(Feature)} />*/
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
