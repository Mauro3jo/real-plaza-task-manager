import React from 'react';
import {StatusBar} from 'react-native';
import {RootNavigator} from './src/navigation/RootNavigator';
import {theme} from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <RootNavigator />
    </>
  );
}

export default App;
