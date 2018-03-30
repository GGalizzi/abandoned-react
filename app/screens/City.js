//@flow
import type { City as CityType } from '../flowtypes/Location';
import type { Dispatch } from 'redux';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
import { getPlaceInfo } from '../helpers';

type Props = {
  currentLocation: CityType,
  dispatch: Dispatch<any>,
}

class City extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    (this:any).toWorld = this.toWorld.bind(this);
  }

  toWorld() {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'World',
    }));
  }

  render() {
    if (!this.props.currentLocation) return null;
    return (
      <View>
        <Text>You are in {this.props.currentLocation.name}</Text>

        <TouchableHighlight onPress={this.toWorld}>
          <Text>To World</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentLocation: getPlaceInfo(state.locations.currentLocation, state.locations),
});

export default connect(mapStateToProps)(City);
