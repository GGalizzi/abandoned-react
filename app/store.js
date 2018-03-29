import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const middleware = [
  navMiddleware,
  thunk,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

export { store };
