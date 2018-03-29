//@flow
import * as Action from '../actions';

export const initialState: number = 5000000000000;

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;

export default function(state: number = initialState, action: any)  {
  switch(action.type) {
    case Action.START_TRAVELLING:
      return state + minute * 15;
    default:
      return state;
  }
}
