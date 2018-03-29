//@flow
import type { PlaceIndex, CurrentLocation, City, LocationData } from '../flowtypes/Location';
import type { Position } from '../flowtypes/Position';
import type { NavigationRoute } from 'react-navigation';
import type { Dispatch } from 'redux';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
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
  }

  updateTravelState(props: Props) {
    this.currentPosition = getCurrentPosition(props.locationData);
    var destinationParam: ?PlaceIndex = props.navigation.state.params.destination;
    if (destinationParam) {
      props.dispatch(
        Action.startTravelling(props.locationData, destinationParam)
      );
    }

  }

  componentWillMount() {
    this.updateTravelState(this.props);
  }

  componentDidUpdate() {
    this.currentPosition = getCurrentPosition(this.props.locationData);
    if (this.props.locationData.currentLocation.type !== 'TRAVEL') {
      this.props.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'City',
        })]
      }));
      return;
    }
    setTimeout(() => {
      this.updateTravelState(this.props);
    }, 1500);
  }

  render() {
    const txt =
      this.props.destination
      ? <Text>Travelling To {this.props.destination.name}</Text>
      : null;
    return (
      <View>
        {txt}

        { this.currentPosition ?
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
