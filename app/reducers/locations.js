//@flow
import type { City } from '../flowtypes/Location';
import type { LocationAction } from '../flowtypes/Action';
import type { CurrentLocation, LocationData } from '../flowtypes/Location';
import { CityGenerator } from '../lib/City';
import * as Action from '../actions';


export const initialState: LocationData = {
  pathGenerator: null,
  currentLocation: {type: 'CITY', id: 1},
  destination: null,
  knownCities: [
    CityGenerator("Cronoga", {x: 10, y: 10}),
    CityGenerator("Malof", {x: 15, y: 18}),
  ],
};

export default (state: LocationData = initialState, action: LocationAction) => {
  switch (action.type) {
    case Action.CHANGE_LOCATION:
      return {
        ...state,
        currentLocation: action.location,
      };
    case Action.CHANGE_DESTINATION:
      return {
        ...state,
        destination: action.destination,
      };
    case Action.START_TRAVELLING:
      return {
        ...state,
        destination: action.destination,
        currentLocation: action.currentLocation,
        pathGenerator: action.pathGenerator,
      };
    case Action.STEP_TRAVEL:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };
    default:
      return state;
  }
}
