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
  pathGenerator: Generator<Position,void,void>,
  dispatch: Dispatch<any>,
};

class Travel extends React.Component<Props> {
  currentPosition: Position = null;
  stopped: boolean = false;
  constructor(props: Props) {
    super(props);
  }

  updateTravelState() {
    if(this.stopped) return;
    this.props.dispatch(Action.stepTravel());
  }

  componentWillUpdate(nextProps) {
    this.currentPosition = getCurrentPosition(nextProps.locationData);
  }

  componentWillMount() {
    this.updateTravelState();
  }

  componentWillUnmount() {
    this.stopped = true;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.updateTravelState();
    }, 100);
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
  pathGenerator: state.locations.pathGenerator,
  locationData: state.locations,
});

export default connect(mapStateToProps)(Travel);
