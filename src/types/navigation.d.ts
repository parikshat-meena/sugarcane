import type { AuthStackParamList } from '../navigation/auth/AuthNavigator';
import type { AppStackParamList } from '../navigation/app/AppNavigator';
import type { RootStackParamList } from '../navigation/RootNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, AuthStackParamList, AppStackParamList {}
  }
}

