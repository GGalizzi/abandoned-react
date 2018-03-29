import { combineReducers } from 'redux';
import nav from './nav';
import city from './city';
import locations from './locations';
import player from './player';
import time from './time';

export default combineReducers({
  nav,
  time,
  city,
  locations,
  player,
});
