import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabNavigation from './TabNavigation';


function HomeScreen({ navigation, route }) { // FIXME: navigation must be defined
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.post) {

    }
  }, [route.params?.post])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Count: {count}</Text>;
      <Button
        title="Create post"
        onPress={() => {
          navigation.navigate('CreatePost')
        }}
      />
      <Text style={{ margin: 10 }} >Post: {route.params?.post} </Text>
    </View>
  )
}


function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('')
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
      <TabNavigation />
    </>
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
            // params: 
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


function Profile() {
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
      }
    }, [])
  )
  return <ProfileContent />
}


function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  )
}


function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30, backgroundColor: 'black' }}
      source={require('./assets/icon.png')}
    />
  )
}


function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ // any screen that belongs to StackScreen will share these properties
        headerStyle: {
          backgroundColor: '#e6e6e6',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: 'my home',  
          // Replace the current header with a custom component
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => (alert('this is a button!'))}
              title='info'
              color='#fff'
            />
          )
        }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  )
}


function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  )
}


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


export default function App(props) {
  const isLoggedIn = props.isLoggedIn
  return (
    <NavigationContainer>
      {/* Initial route */}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home" // name of the route
          component={HomeScreen} // component to render
          options={{ headerShown: false }} // options for the route
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }} // initial params for the route
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="StackScreen"
          component={StackScreen}
        />
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} /> */}
          </Stack.Group>
        )}
        {/* Common modal screens */}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          {/* <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Invite" component={Invite} /> */}
        </Stack.Group>

        <Tab.Screen name="First">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
              />
              <SettingsStack.Screen name="Profile" component={ProfileScreen} />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Second">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="Home" component={HomeScreen} />
              <HomeStack.Screen name="Details" component={DetailsScreen} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

