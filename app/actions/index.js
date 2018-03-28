//@flow
import type {
   HealStaminaAction,
   ChangeLocationAction,
   ChangeDestinationAction,
   TimeAction
   } from '../flowtypes/Action';
import type { CurrentLocation } from '../flowtypes/Location';

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
export function startTravelling(destination: CurrentLocation): ChangeDestinationAction {
  return {
    type: CHANGE_DESTINATION,
    destination,
  }
}
