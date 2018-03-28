//@flow
import type { CurrentLocation, Travel } from './Location';

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
  destination: CurrentLocation,
  currentLocation: Travel,
}

export type PassTimeAction = {
  type: 'PASS_TIME',
  time: number,
}

export type MobAction =
  | HealStaminaAction

export type LocationAction =
  | ChangeLocationAction
  | ChangeDestinationAction
  | StartTravellingAction


export type TimeAction =
  | PassTimeAction
