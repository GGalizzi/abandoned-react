import reducer, { initialState as initialTime } from '../app/reducers/time';
import { timeForward } from '../app/actions';

describe('the passing of time', () => {
  it('can go forward', () => {
    expect(reducer(initialTime, timeForward(50))).toBe(initialTime + 50);
  })
})
