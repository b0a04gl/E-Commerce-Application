import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Init from './screens/initScreen';
import StackNavigator from './screens/StackNavigator';
import DrawerNavigator from './screens/Drawer';

export default function App() {
  return (
    <DrawerNavigator/>
  );
}


