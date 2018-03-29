//@flow
import type { Position } from './Position';
import type { Amenity } from './Amenity';
export type CurrentLocation =
  | PlaceIndex
  | Travel

export type Travel = {
  type: 'TRAVEL',
  position: Position,
}

export type PlaceIndex = {
  type: 'CITY' | 'DUNGEON',
  index: number,
};

export type Place =
  | City

export type City = {|
  name: string,
  position: Position,
  amenities: Array<Amenity>,
|};

export type LocationData = {
  pathGenerator: ?Generator<Position, void, void>,
  currentLocation: CurrentLocation,
  destination: ?CurrentLocation,
  knownCities: Array<City>,
};
