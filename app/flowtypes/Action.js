//@flow
import type { CurrentLocation } from './Location';

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

export type PassTimeAction = {
  type: 'PASS_TIME',
  time: number,
}

export type MobAction =
  | HealStaminaAction

export type LocationAction =
  | ChangeLocationAction
  | ChangeDestinationAction


export type TimeAction =
  | PassTimeAction
