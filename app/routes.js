import React from 'react';
import { StackNavigator } from 'react-navigation';
import City from './screens/City';
import World from './screens/World';
import Travel from './screens/Travel';

export default StackNavigator({
  City: {
    screen: City,
  },
  World: {
    screen: World,
  },
  Travel: {
    screen: Travel,
  }
}, {
  navigationOptions: {
    //header: null,
  }
});
