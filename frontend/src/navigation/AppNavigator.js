import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RegisterSeniorScreen from '../screens/auth/RegisterSeniorScreen';
import RegisterChildScreen from '../screens/auth/RegisterChildScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import MedicationListScreen from '../screens/medication/MedicationListScreen';
import MedicationAddScreen from '../screens/medication/MedicationAddScreen';
import MedicationScheduleScreen from '../screens/medication/MedicationScheduleScreen';
import CaregiverListScreen from '../screens/care/CaregiverListScreen';
import CareRequestScreen from '../screens/care/CareRequestScreen';
import GuardianDashboardScreen from '../screens/guardian/GuardianDashboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MedicationStack = () => (
  <Stack.Navigator screenOptions={{ headerTintColor: COLORS.primary }}>
    <Stack.Screen name="MedicationList" component={MedicationListScreen} options={{ title: '약 관리' }} />
    <Stack.Screen name="MedicationAdd" component={MedicationAddScreen} options={{ title: '약 추가' }} />
    <Stack.Screen name="MedicationSchedule" component={MedicationScheduleScreen} options={{ title: '복용 스케줄' }} />
  </Stack.Navigator>
);

const CareStack = () => (
  <Stack.Navigator screenOptions={{ headerTintColor: COLORS.primary }}>
    <Stack.Screen name="CaregiverList" component={CaregiverListScreen} options={{ title: '돌봄 매칭' }} />
    <Stack.Screen name="CareRequest" component={CareRequestScreen} options={{ title: '돌봄 요청' }} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{ title: '홈', tabBarLabel: '홈' }}
    />
    <Tab.Screen
      name="MedicationTab"
      component={MedicationStack}
      options={{ title: '약 관리', tabBarLabel: '약 관리' }}
    />
    <Tab.Screen
      name="CareTab"
      component={CareStack}
      options={{ title: '돌봄', tabBarLabel: '돌봄' }}
    />
    <Tab.Screen
      name="GuardianTab"
      component={GuardianDashboardScreen}
      options={{ title: '보호자', tabBarLabel: '보호자' }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '회원가입' }} />
    <Stack.Screen name="RegisterSenior" component={RegisterSeniorScreen} options={{ title: '어르신 가입' }} />
    <Stack.Screen name="RegisterChild" component={RegisterChildScreen} options={{ title: '자녀 가입' }} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
};

export default AppNavigator;
