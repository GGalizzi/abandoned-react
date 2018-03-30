//@flow
import type { Dispatch } from 'redux';
import type { City, PlaceIndex } from '../flowtypes/Location';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Button, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as Action from '../actions';

type Props = {
  knownCities: City[],
  dispatch: Dispatch<any>,
};

export class World extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    (this:any).travelTo = this.travelTo.bind(this);
  }

  travelTo (location: PlaceIndex) {
    return () => {
      this.props.dispatch(Action.startTravelling(location));
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.knownCities}
          keyExtractor={(item) => item.name}
          renderItem={({item, index}) => (
            <View>
              <Button
                onPress={this.travelTo({type:'CITY', index})}
                title={item.name}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

          const mapStateToProps = (state) => ({
            knownCities: state.locations.knownCities,
          });

          export default connect(mapStateToProps)(World);
