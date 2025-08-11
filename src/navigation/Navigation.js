import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@pages/Index';
import Home from '@pages/Home';
import CharacterMain from '@pages/character/CharacterMain';
import StudyListPage from '@pages/study/StudyListPage';
import Friends from '@pages/friends/Friends';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CharacterMain" component={CharacterMain} />
        <Stack.Screen name="StudyList" component={StudyListPage} />
        <Stack.Screen name="Friends" component={Friends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
