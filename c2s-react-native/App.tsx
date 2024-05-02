import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/routes/navigation';


export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" backgroundColor="transparent" translucent={true} />
        <Navigation /> 
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
