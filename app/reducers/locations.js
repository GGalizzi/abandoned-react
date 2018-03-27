//@flow
import type { City } from '../models/City';
import { CityGenerator } from '../models/City';

export const initialState = {
  knownCities: [
    CityGenerator("Cronoga"),
    CityGenerator("Malof"),
  ],
};
