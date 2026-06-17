import React from 'react';
import {StatusBar} from 'react-native';
import {RootNavigator} from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F7F9" />
      <RootNavigator />
    </>
  );
}

export default App;
