//@flow
import type { City } from '../flowtypes/Location';
import type { LocationAction } from '../flowtypes/Action';
import type { CurrentLocation, LocationData } from '../flowtypes/Location';
import { CityGenerator } from '../models/City';
import * as Action from '../actions';


export const initialState: LocationData = {
  pathGenerator: null,
  currentLocation: {type: 'CITY', index: 0},
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
    default:
      return state;
  }
}
