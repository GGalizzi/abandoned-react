//@flow
import type { Dispatch } from 'redux';
import type { City, CurrentLocation } from '../flowtypes/Location';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { passTime } from '../actions';

type Props = {
  knownCities: City[],
  dispatch: Dispatch<any>,
};

export class World extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    (this:any).travelTo = this.travelTo.bind(this);
  }

  travelTo (location: CurrentLocation) {
    return () => {
      this.props.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Travel',
          params: { destination: location },
        })]
      }));
    }
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.travelTo({type: 'CITY', index: 1})}>
          <Text>Travel elsewhere</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  knownCities: state.locations.knownCities,
});

export default connect(mapStateToProps)(World);
