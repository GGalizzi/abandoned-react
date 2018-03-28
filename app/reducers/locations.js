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
        ...initialState,
        currentLocation: action.location,
      };
    case Action.CHANGE_DESTINATION:
      return {
        ...initialState,
        destination: action.destination,
      };
    default:
      return state;
  }
}
