//@flow
import type { Place } from './flowtypes/Location';

export function getPlaceInfo(location: Place, state: any): any {
  if (!location) return null;
  return state.locations.knownCities[location.index];
}
