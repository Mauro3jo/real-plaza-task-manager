import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TaskDetailScreen} from '../features/tasks/screens/TaskDetailScreen';
import {TaskListScreen} from '../features/tasks/screens/TaskListScreen';
import {theme} from '../theme/theme';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    border: theme.colors.border,
    card: theme.colors.surface,
    primary: theme.colors.primary,
    text: theme.colors.textPrimary,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: theme.colors.background},
          headerShadowVisible: false,
          headerStyle: {backgroundColor: theme.colors.surface},
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.textPrimary,
            fontSize: theme.font.xxl,
            fontWeight: theme.fontWeight.strong,
          },
        }}>
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
