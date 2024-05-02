// Navigation.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screen/Home';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false, // Remova o cabeçalho
        }} />
    </Stack.Navigator>
  );
};

export default Navigation;
