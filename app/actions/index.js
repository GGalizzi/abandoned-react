//@flow
import type {
   HealStaminaAction,
   ChangeLocationAction,
   ChangeDestinationAction,
   StartTravellingAction,
   StepTravelAction,
   PassTimeAction,
   TimeAction,
   } from '../flowtypes/Action';
import type { Travel, Place, PlaceIndex, CurrentLocation, LocationData } from '../flowtypes/Location';
import type { Position } from '../flowtypes/Position';
import { getPlaceInfo, getCurrentPosition } from '../helpers';
import { NavigationActions } from 'react-navigation';
import * as Time from '../lib/time';
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

export const TIME_FORWARD = 'TIME_FORWARD';
export function timeForward(timePassed: number): TimeAction {
  return {
    type: TIME_FORWARD,
    timePassed,
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
export function startTravelling(destination: PlaceIndex) {
  return function(dispatch: any, getState: any) {
    // Creates the pathGenerator
    // sets the state destination
    // dispatches navigation change

    const state = getState();
    if (state.locations.currentLocation.type === 'TRAVEL') {
      throw new Error("Can't start new travel during travel, it has to be stopped first");
    }

    let pathGenerator = createAStarGenerator(
      getPlaceInfo(destination, state.locations),
      getCurrentPosition(state.locations),
    );

    pathGenerator.next();

    let startTravel: StartTravellingAction = {
      type: START_TRAVELLING,
      pathGenerator,
      destination,
      currentLocation: {
        type: 'TRAVEL',
        position: getCurrentPosition(state.locations),
      }
    };

    dispatch(startTravel);
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'Travel'
      })],
    }));
  }
}

export const STEP_TRAVEL = 'STEP_TRAVEL';
export function stepTravel() {
  return function(dispatch: any, getState: any) {
    // Get the next position from pathGenerator, pass time if moved
    // If pathGenerator is done then navigate to City or corresponding screen.
    // and finish travel state

    const state = getState();

    if (state.locations.currentLocation.type !== 'TRAVEL') {
      throw new Error("Trying to step travel when we are not in travel. ");
    }

    const n = (state.locations.pathGenerator:any).next();
    let newLocation: CurrentLocation = state.locations.currentLocation;
    if (n.done) {
      newLocation = state.locations.destination;
    } else {
      (newLocation:any).position = n.value;
      if (n.value !== state.locations.currentLocation.position) {
        dispatch(timeForward(Time.minute * 15))
      }
    }
    const newStep: StepTravelAction = {
      type: 'STEP_TRAVEL',
      currentLocation: newLocation,
    }
    dispatch(newStep);

    if (n.done) {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'City'
        })],
      }));
    }
  }
}
