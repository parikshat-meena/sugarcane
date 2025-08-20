import React from 'react';
import type { NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './auth/AuthNavigator';
import { AppNavigator } from './app/AppNavigator';
import { useAuthStore } from '../store/authStore';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function RootNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

