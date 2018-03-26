import React from 'react';
import { StackNavigator } from 'react-navigation';
import City from './screens/City';

export default StackNavigator({
  City: {
    screen: City,
  },
}, {
  mode: 'modal',
  navigationOptions: {
    header: null,
  }
});
