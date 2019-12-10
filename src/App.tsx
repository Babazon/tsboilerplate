import 'es6-symbol/implement';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';

export default class App extends React.Component {

  public render() {

    return (
      <ErrorBoundary>
        <View style={styles.flex}>
          <Text>Hello World</Text>
        </View>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
