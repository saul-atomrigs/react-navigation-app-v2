import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen() {
  return (
    <>
    </>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* Initial route */}
      <Stack.Navigator initialRouteName='Details'>
        <Stack.Screen
          name="Home" // name of the route
          component={HomeScreen} // component to render
          options={{ title: 'Overview' }} // options for the route
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
