//@flow
import type { Mob } from '../flowtypes/Mob';
import type { MobAction } from '../flowtypes/Action';
import * as Action from '../actions';

export const initialState: Mob = {
  health: 100,
  stamina: 100,
};

export default (state: Mob = initialState, action: MobAction) => {
  switch (action.type) {
    case Action.HEAL_STAMINA:
      let newStamina = state.stamina + action.amount;
      if (newStamina > 100) newStamina = 100;
      return {
        ...state,
        stamina: newStamina,
      };
    default:
      return state;
  }
};
