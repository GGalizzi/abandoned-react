import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { NavigationActions } from 'react-navigation';
import reducer, { initialState } from '../app/reducers/locations';
import { initialState as initialTime } from '../app/reducers/time';
import { changeLocation, startTravelling, stepTravel, createAStarGenerator } from '../app/actions';
import { World } from '../app/screens/World';
import TestRenderer from 'react-test-renderer';

const middleware = [thunk];
const mockStore = configureStore(middleware);

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
      let store = mockStore({locations: initialState});
      it('can start traveling somewhere', () => {
        store.dispatch(startTravelling(newCity));

        expect(store.getActions()[0]).toMatchObject({
          type: 'START_TRAVELLING',
          pathGenerator: expect.anything(),
          destination: newCity,
          currentLocation: {
            type: 'TRAVEL',
            position: {x:10, y:10},
          }
        });

        expect(store.getActions()[1]).toMatchObject({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'Travel',
          })]
        });

        newState = reducer(initialState, store.getActions()[0]);

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
        store = mockStore({locations:newState});
        store.dispatch(stepTravel());

        expect(store.getActions()[0]).toMatchObject({
          type: 'STEP_TRAVEL',
          currentLocation: {
            type: 'TRAVEL',
            position: { x: 11, y: 11 },
          }
        });

        newState = reducer(newState, store.getActions()[0]);
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
        store.clearActions();
        store.dispatch(stepTravel());

        expect(store.getActions()[0]).toMatchObject({
          type:'STEP_TRAVEL',
          currentLocation: newCity,
        });

        expect(store.getActions()[1]).toMatchObject({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'City',
          })]
        });

        expect(reducer(newState, store.getActions()[0])).toMatchObject({
          ...newState,
          currentLocation: newCity,
        })
      })
    })
  })
})
