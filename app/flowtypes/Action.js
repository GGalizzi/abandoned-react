//@flow
import type { CurrentLocation, Travel } from './Location';
import type { Position } from './Position';

export type HealStaminaAction = {
  type: 'HEAL_STAMINA',
  amount: number,
};

export type ChangeLocationAction = {
  type: 'CHANGE_LOCATION',
  location: CurrentLocation,
}

export type ChangeDestinationAction = {
  type: 'CHANGE_DESTINATION',
  destination: CurrentLocation,
}

export type StartTravellingAction = {
  type: 'START_TRAVELLING',
  destination: ?CurrentLocation,
  currentLocation: Travel,
  pathGenerator: ?Generator<Position, void, void>,
}

export type StepTravelAction = {
  type: 'STEP_TRAVEL',
  currentLocation: CurrentLocation,
}

export type PassTimeAction = {
  type: 'TIME_FORWARD',
  timePassed: number,
}

export type MobAction =
  | HealStaminaAction

export type LocationAction =
  | ChangeLocationAction
  | ChangeDestinationAction
  | StartTravellingAction
  | StepTravelAction


export type TimeAction =
  | PassTimeAction
