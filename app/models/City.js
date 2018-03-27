//@flow
import type { Position } from '../flowtypes/Position';
import type { Amenity, Inn, Weaponsmith } from '../flowtypes/Amenity';

export type City = {|
  name: string,
  position: Position,
  amenities: Array<Amenity>,
|};

export function CityGenerator(name: string): City {
  return {
    name,
    position: {x: 10, y: 10},
    amenities: [
      {
        type: 'INN',
        cost: 200,
      },
    ],
  }
}
