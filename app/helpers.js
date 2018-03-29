//@flow
import type { PlaceIndex, LocationData } from './flowtypes/Location';
import type { Position } from './flowtypes/Position';

export function getPlaceInfo(location: PlaceIndex, state: LocationData): any {
  if (!location) return null;
  return state.knownCities[location.index];
}

export function getCurrentPosition(locationData: LocationData): Position {
  if (locationData.currentLocation.type === 'TRAVEL') {
    return locationData.currentLocation.position;
  } else {
    return getPlaceInfo(locationData.currentLocation, locationData).position;
  }
}
