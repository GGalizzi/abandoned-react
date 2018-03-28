import { combineReducers } from 'redux';
import nav from './nav';
import city from './city';
import locations from './locations';
import player from './player';

export default combineReducers({
  nav,
  city,
  locations,
  player,
});
