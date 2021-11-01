import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation }) { // FIXME: navigation must be defined
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')} // navigation prop is passed in automatically. navigate is a method that takes a screen name as a parameter (to where we want to mmove to)
      />
    </View>
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
      <Stack.Navigator initialRouteName='Home'>
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
