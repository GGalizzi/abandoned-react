
import React from 'react';
import EStyle from 'react-native-extended-stylesheet';
import { Text, View, BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { store } from './store';
import Navigator from './routes';

const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  componentDidMount() {
    this.subs = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillUnmount() {
    this.subs && this.subs.remove();
  }

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

const AppWithNav = connect(mapStateToProps)(App);

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNav />
      </Provider>
    );
  }
}

EStyle.build({
  $outline: 0,
});
