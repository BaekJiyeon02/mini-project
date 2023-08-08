import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './auth/LoginScreen.js'; 
import RegisterScreen from './auth/RegisterScreen.js'; 
import CalendarScreen from './CalendarScreen.js'; 
import MemoMainScreen from './memo/MemoMainScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="MemoMain" component={MemoMainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}