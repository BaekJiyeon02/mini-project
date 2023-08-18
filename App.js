import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './auth/LoginScreen.js'; 
import RegisterScreen from './auth/RegisterScreen.js'; 
import MemoMainScreen from './memo/MemoMainScreen.js';
import MemoFolderScreen from './memo/MemoFolderScreen.js';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MemoMain" component={MemoMainScreen} />
        <Stack.Screen name="MemoFolder" component={MemoFolderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};