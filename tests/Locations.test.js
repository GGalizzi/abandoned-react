import React from 'react';
import reducer, { initialState } from '../app/reducers/locations';
import { initialState as initialTime } from '../app/reducers/time';
import { changeLocation, startTravelling } from '../app/actions';
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

    it('can start traveling somewhere', () => {
      const newCity = {type: 'CITY', index: 1};
      const initCity = initialState.knownCities[0];
      expect(reducer(initialState, startTravelling(initCity.position, newCity))).toEqual({
        ...initialState,
        destination: newCity,

        currentLocation: {
          type: 'TRAVEL',
          position: initCity.position,
        }
      })
    })
  })
})
