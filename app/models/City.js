//@flow
import type { Position } from '../flowtypes/Position';
import type { City } from '../flowtypes/Location';
import type { Amenity, Inn, Weaponsmith } from '../flowtypes/Amenity';

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
