import reducer, { initialState } from '../app/reducers/player.js';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState as initialLocations } from '../app/reducers/locations';
import { healStamina, startTravelling, stepTravel } from '../app/actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
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

  it("loses stamina when travelling", () => {
    store = mockStore({locations: {
      ...initialLocations,
      currentLocation: {
        type: 'TRAVEL',
        position: {x:1, y:1}
      },
      pathGenerator: {next: jest.fn(() => ({done: false}))}
    }});
    store.dispatch(stepTravel());

    const newStamina = reducer(initialState, store.getActions()[0]).stamina;
    expect(newStamina).toBeLessThan(initialState.stamina);
  });
});
