//@flow
import type { Place, CurrentLocation, City } from '../flowtypes/Location';
import type { NavigationRoute } from 'react-navigation';
import type { Dispatch } from 'redux';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPlaceInfo } from '../helpers';
import * as Action from '../actions';

type Props = {
  destination: City,
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
      this.props.dispatch(Action.startTravelling(destinationParam));
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
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
    destination: getPlaceInfo(state.locations.destination, state),
    currentLocation: state.locations.currentLocation,
});

export default connect(mapStateToProps)(Travel);
