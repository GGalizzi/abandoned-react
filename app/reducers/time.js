//@flow
import type { TimeAction } from '../flowtypes/Action';
import * as Time from '../lib/time';
import * as Action from '../actions';

export const initialState: number = 5000000000000;

export default function(state: number = initialState, action: TimeAction)  {
  switch(action.type) {
    case Action.TIME_FORWARD:
      return state + action.timePassed;
    default:
      return state;
  }
}
