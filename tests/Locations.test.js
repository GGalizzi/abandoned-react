import React from 'react';
import reducer, { initialState } from '../app/reducers/locations';
import { initialState as initialTime } from '../app/reducers/time';
import { changeLocation, startTravelling, createAStarGenerator } from '../app/actions';
import { World } from '../app/screens/World';
import TestRenderer from 'react-test-renderer';

describe('currentLocation', () => {
  describe('changing location', () => {
    it('can change', () => {
      const newCity = {type: 'CITY', index: 1};
      expect(reducer(initialState, changeLocation(newCity))).toEqual({
        ...initialState,
        currentLocation: newCity,
      })
    })

    describe('travelling', () => {
      initialState.knownCities[0].position = { x: 10, y: 10 };
      initialState.knownCities[1].position = { x: 11, y: 11 };
      const newCity = {type: 'CITY', index: 1};
      const initCity = initialState.knownCities[0];
      let newState = null;
      it('can start traveling somewhere', () => {
        const action = startTravelling(initialState, newCity)
        newState = reducer(initialState, action);
        expect(newState).toMatchObject({
          ...initialState,
          destination: newCity,
          pathGenerator: expect.anything(),
          currentLocation: {
            type: 'TRAVEL',
            position: { x: 10, y: 10 },
          }
        })
      })

      it('can continue travelling somewhere', () => {
        const action = startTravelling(newState, newCity);
        newState = reducer(newState, action);
        expect(newState).toMatchObject({
          ...newState,
          pathGenerator: expect.anything(),
          currentLocation: {
            type: 'TRAVEL',
            position: { x: 11, y: 11 }
          }
        });
      })

      it('stops travelling, entering new location', () => {
        const action = startTravelling(newState, newCity);

        expect(reducer(newState, action)).toMatchObject({
          ...newState,
          destination: null,
          pathGenerator: null,
          currentLocation: newCity,
        })
      })
    })
  })
})
