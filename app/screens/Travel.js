//@flow
import type { PlaceIndex, CurrentLocation, City, LocationData } from '../flowtypes/Location';
import type { Position } from '../flowtypes/Position';
import type { NavigationRoute } from 'react-navigation';
import type { Dispatch } from 'redux';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPlaceInfo, getCurrentPosition } from '../helpers';
import * as Action from '../actions';

type Props = {
  locationData: LocationData,
  destination: City,
  navigation: any,
  dispatch: Dispatch<any>,
};

class Travel extends React.Component<Props> {
  currentPosition: Position = null;
  constructor(props: Props) {
    super(props);

    this.currentPosition = getCurrentPosition(props.locationData);
  }

  componentWillMount() {
    var destinationParam: ?PlaceIndex = this.props.navigation.state.params.destination;
    if (destinationParam) {
      this.props.dispatch(
        Action.startTravelling(this.props.locationData, destinationParam)
      );
    }
  }

  render() {
    const txt =
      this.props.destination
      ? <Text>Travelling To {this.props.destination.name}</Text>
      : null;
    return (
      <View>
        {txt}

        { this.props.currentPosition ?
          <Text>
            {"location" + this.currentPosition.x + "," + this.currentPosition.y }
          </Text>
        : null }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  destination: getPlaceInfo(state.locations.destination, state.locations),
  locationData: state.locations,
});

export default connect(mapStateToProps)(Travel);
