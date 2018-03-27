/* @flow */
import type { City } from '../models/City';
import type { Position } from '../flowtypes/Position';
import type { Amenity, Inn, Weaponsmith } from '../flowtypes/Amenity';
import { CityGenerator } from '../models/City';
import { initialState as locationsInitialState } from './locations';

const initialState: City = locationsInitialState.knownCities[0];

export default (state: City = initialState, action: string) => state;
