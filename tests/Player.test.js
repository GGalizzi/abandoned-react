import reducer, { initialState } from '../app/reducers/player.js';
import { healStamina } from '../app/actions';

describe("Player actions", () => {
  it("can rest", () => {
    const healAmnt = 10;
    initialState.stamina = 90;
    expect(reducer(initialState, healStamina(healAmnt))).toEqual({
      ...initialState,
      stamina: initialState.stamina + healAmnt,
    });
  });

  //TODO: Some degree of Over rest on fancy beds should be possible
  it("can't overrest", () => {
    const healAmnt = 10;
    initialState.stamina = 100;
    expect(reducer(initialState, healStamina(healAmnt))).toEqual(initialState);
  });
});
