//@flow
import type {
   HealStaminaAction,
   ChangeLocationAction,
   ChangeDestinationAction,
   StartTravellingAction,
   TimeAction
   } from '../flowtypes/Action';
import type { Place, PlaceIndex, CurrentLocation, LocationData } from '../flowtypes/Location';
import type { Position } from '../flowtypes/Position';
import { getPlaceInfo, getCurrentPosition } from '../helpers';
import ROT from '../vendor/rot';

export const HEAL_STAMINA = 'HEAL_STAMINA';
export function healStamina(amount: number): HealStaminaAction {
  return {
    type: HEAL_STAMINA,
    amount,
  };
}

export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export function changeLocation(location: CurrentLocation): ChangeLocationAction {
  return {
    type: CHANGE_LOCATION,
    location,
  }
}

export const PASS_TIME = 'PASS_TIME';
export function passTime(time: number): TimeAction {
  return {
    type: PASS_TIME,
    time,
  };
}

export const CHANGE_DESTINATION = 'CHANGE_DESTINATION';
export function changeDestination(destination: CurrentLocation): ChangeDestinationAction {
  return {
    type: CHANGE_DESTINATION,
    destination,
  }
}

export function* createAStarGenerator(destination: Place, startingPoint: Position): Generator<Position, void, void> {
  let path = new ROT.Path.AStar(destination.position.x, destination.position.y, () => true);
  let computer = path.compute(startingPoint.x, startingPoint.y);

  let n = computer.next();
  while (!n.done) {
    yield n.value;
    n = computer.next();
  }
}

export const START_TRAVELLING = 'START_TRAVELLING';
export function startTravelling(
  state: LocationData,
  destination: PlaceIndex): StartTravellingAction {
    // If destination is different than our current one
      // Replace it and make a new generator.
    // If we have a generator
      // Get the new position from it's next fn
      // Otherwise make on with the destination point.
    let action: StartTravellingAction = {
      type: START_TRAVELLING,
      pathGenerator: state.pathGenerator,
      destination,
      currentLocation: {
        type: 'TRAVEL',
        position: getCurrentPosition(state),
      }
    };

    const place = getPlaceInfo(destination, state);
    let pathGenerator = state.pathGenerator;
    if (!state.destination ||
        state.destination.type !== destination.type ||
        state.destination.index !== (destination:any).index) {
          pathGenerator = action.pathGenerator = createAStarGenerator(place, getCurrentPosition(state));
    }

    if (!state.pathGenerator) {
      pathGenerator = action.pathGenerator = createAStarGenerator(place, getCurrentPosition(state));
    }

    action.currentLocation.position = (pathGenerator:any).next().value;
    return action;
}
