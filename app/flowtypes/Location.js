//@flow
import type { Position } from './Position';
import type { Amenity } from './Amenity';
export type CurrentLocation =
  | Place
  | Travel

export type Travel = {
  type: 'TRAVEL',
  location: Position,
}

export type Place = {
  type: 'CITY' | 'DUNGEON',
  index: number,
};

export type City = {|
  name: string,
  position: Position,
  amenities: Array<Amenity>,
|};
