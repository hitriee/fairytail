import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Main from './screens/Main';
import MessageCreate from './screens/MessageCreate';
import MessageDetail from './screens/MessageDetail';
import MessageList from './screens/MessageList';
import MessageVR from './screens/MessageVR';
import Globe from './screens/Globe';
import Map from './screens/Map';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MessageCreate" component={MessageCreate} />
        <Stack.Screen name="MessageDetail" component={MessageDetail} />
        <Stack.Screen name="MessageList" component={MessageList} />
        <Stack.Screen name="MessageVR" component={MessageVR} />
        <Stack.Screen name="Globe" component={Globe} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
