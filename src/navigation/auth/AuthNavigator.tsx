import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/auth/LoginScreen';
import { ForgotUsernameScreen } from '../../screens/auth/ForgotUsernameScreen';
import { ForgotPasswordScreen } from '../../screens/auth/ForgotPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotUsername: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="ForgotUsername" component={ForgotUsernameScreen} options={{ title: 'Find Username' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} />
    </Stack.Navigator>
  );
}

