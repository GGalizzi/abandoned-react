//@flow
import type { Place, CurrentLocation, City } from '../flowtypes/Location';
import type { Position } from '../flowtypes/Position';
import type { NavigationRoute } from 'react-navigation';
import type { Dispatch } from 'redux';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPlaceInfo } from '../helpers';
import * as Action from '../actions';

type Props = {
  destination: City,
  currentPosition: Position,
  currentLocation: City,
  navigation: any,
  dispatch: Dispatch<any>,
};

class Travel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    var destinationParam: ?CurrentLocation = this.props.navigation.state.params.destination;
    if (destinationParam) {
      this.props.dispatch(
        Action.startTravelling(this.props.currentLocation.position, destinationParam)
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
            {"location" + this.props.currentPosition.x + "," + this.props.currentPosition.y }
          </Text>
        : null }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const destination = getPlaceInfo(state.locations.destination, state);
  const currentPosition = state.locations.currentLocation.position;
  const currentLocation = getPlaceInfo(state.locations.currentLocation, state);

  return {
    destination,
    currentPosition,
    currentLocation,
  };
};

export default connect(mapStateToProps)(Travel);
