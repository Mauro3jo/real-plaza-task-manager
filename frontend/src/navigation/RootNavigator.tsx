import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TaskDetailScreen} from '../features/tasks/screens/TaskDetailScreen';
import {TaskListScreen} from '../features/tasks/screens/TaskListScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F6F7F9',
    border: '#E5E7EB',
    card: '#FFFFFF',
    primary: '#2563EB',
    text: '#111827',
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: '#F6F7F9'},
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerTintColor: '#2563EB',
          headerTitleStyle: {
            color: '#111827',
            fontSize: 17,
            fontWeight: '800',
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
