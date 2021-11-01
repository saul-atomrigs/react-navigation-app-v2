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
        onPress={() => {
          navigation.navigate('Details',
            {
              itemId: 86,
              otherParam: 'anything you want here',
            })
        }}
      />
    </View>
  )
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)} </Text>
      <Text>itemId: {JSON.stringify(otherParam)} </Text>
      <Button
        title='Go to details...again'
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home')} // navigate is a method that takes a screen name as a parameter (to where we want to mmove to)
      />
      <Button
        title='Go back'
        onPress={() => navigation.goBack()} // goBack is a method that takes a screen name as a parameter (to where we want to mmove to)
      />
    </View>
  )
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
