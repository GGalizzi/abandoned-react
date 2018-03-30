//@flow
import type { Position } from '../flowtypes/Position';
import type { City } from '../flowtypes/Location';
import type { Amenity, Inn, Weaponsmith } from '../flowtypes/Amenity';

let id = 0;
export function CityGenerator(name: string, position: Position): City {
  return {
    id: ++id,
    name,
    position,
    amenities: [
      {
        type: 'INN',
        cost: 200,
      },
    ],
  }
}
