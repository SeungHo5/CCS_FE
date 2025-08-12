import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@pages/Index';
import Home from '@pages/Home';
import CharacterMain from '@pages/character/CharacterMain';
import StudyListPage from '@pages/study/StudyListPage';
import Friends from '@pages/friends/Friends';
import Challenge from '@pages/challenge/Challenge';
import GroupListPage from '@pages/group/GroupListPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  console.log("🗺️ Navigation 시작");
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          animation: 'none'
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CharacterMain" component={CharacterMain} />
        <Stack.Screen name="StudyListPage" component={StudyListPage} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Challenge" component={Challenge} />
        <Stack.Screen name="GroupListPage" component={GroupListPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
