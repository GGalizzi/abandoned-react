//@flow
import type { City } from '../flowtypes/Location';
import type { LocationAction } from '../flowtypes/Action';
import type { CurrentLocation } from '../flowtypes/Location';
import { CityGenerator } from '../models/City';
import * as Action from '../actions';

type LocationData = {
  currentLocation: CurrentLocation,
  destination: ?CurrentLocation,
  knownCities: Array<City>,
};

export const initialState: LocationData = {
  currentLocation: {type: 'CITY', index: 0},
  destination: null,
  knownCities: [
    CityGenerator("Cronoga"),
    CityGenerator("Malof"),
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
      };
    default:
      return state;
  }
}
