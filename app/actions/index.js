//@flow
import type {
   HealStaminaAction,
   ChangeLocationAction,
   ChangeDestinationAction,
   StartTravellingAction,
   TimeAction
   } from '../flowtypes/Action';
import type { CurrentLocation } from '../flowtypes/Location';
import { getPlaceInfo } from '../helpers';

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

export const START_TRAVELLING = 'START_TRAVELLING';
export function startTravelling(
  currentPosition: Position,
  destination: CurrentLocation): StartTravellingAction {
    console.log("PASSED POSITION:", currentPosition);
    return {
      type: START_TRAVELLING,
      destination,
      currentLocation: {
        type: 'TRAVEL',
        position: currentPosition,
      }
    };
}
