// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Styles from './style/style';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Recipe from './components/Recipe';
import CategoryPage from './components/CategoryPage';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import About from './components/About';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './firebase/config';
import EditRecipe from './components/EditRecipe'

const Tab = createBottomTabNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationKey, setnavigationKey] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 8,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundColor: '#fefffc',
            shadowColor: '#2c3126',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 25,
            height: 50,
            ...Platform.select({
              ios: {
                bottom: 30,
                height: 55,
                paddingBottom: 0
              },
              android: {}
            }),
          }
        }}
      >

        {/* <Tab.Screen name='Welcome' component={Welcome}
          options={{tabBarStyle: { display: 'none' }, tabBarButton: (props) => null }} /> */}

        {isAuthenticated ? (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarIcon: ({ color }) => (
                  <Ionicons name="home-sharp" size={25} color={color} />
                ),
                tabBarActiveTintColor: '#61876E',
                tabBarInActiveTintColor: 'gray',
                tabBarInactiveBackgroundColor: 'blue'
                
              }}
            />
            <Tab.Screen name='Recipes' component={CategoryPage}
              options={{
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="list" size={23} color={color} />
                ),
                tabBarActiveTintColor: '#61876E',
                tabBarInActiveTintColor: 'gray',
              }} />
            <Tab.Screen name='Add recipes' component={AddRecipe}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="playlist-add" size={33} color={color} />
                ),
                tabBarActiveTintColor: '#61876E',
                tabBarInActiveTintColor: 'gray'
              }} />
            <Tab.Screen name='RecipeList' component={RecipeList}
              options={{ tabBarButton: (props) => null }} />
            <Tab.Screen name='Recipe' component={Recipe}
              options={{ tabBarButton: (props) => null }} />
            <Tab.Screen name='EditRecipe' component={EditRecipe}
              options={{ tabBarButton: (props) => null }} />
            <Tab.Screen name='About' component={About}
            initialParams={{isAuthenticated: isAuthenticated}}
              options={{
                
                tabBarIcon: ({ color }) => (
                  <Ionicons name="information" size={30} color={color} />
                ),
                tabBarActiveTintColor: '#61876E',
                tabBarInActiveTintColor: 'gray'
              }} />
            {/* <Tab.Screen
              name="Welcome"
              component={Welcome}
              options={{ tabBarStyle: { display: 'none' }, tabBarButton: (props) => null }}
            /> */}
          </>
        ) : (
          <>
            <Tab.Screen
              name="Welcome"
              component={Welcome}
              options={{ tabBarStyle: { display: 'none' }, tabBarButton: (props) => null }}
            />
            <Tab.Screen name='About' component={About}
              options={{
                isAuthenticated: isAuthenticated,
                tabBarStyle: { display: 'none' },
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="information-variant" size={30} color={color} />
                ),
                tabBarActiveTintColor: '#61876E',
                tabBarInActiveTintColor: 'gray'
              }} />
            <Tab.Screen name='Login' component={Login}
              options={{ tabBarStyle: { display: 'none' }, tabBarButton: (props) => null }} />
            <Tab.Screen name='Register' component={Register}
              options={{ tabBarStyle: { display: 'none' }, tabBarButton: (props) => null }} />
          </>

        )}


        {/* <Tab.Screen name="Home" component={Home} options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-account" size={30} color={color} />
          ),
          tabBarActiveTintColor: '#61876E',
          tabBarInActiveTintColor: 'gray'
        }} /> */}
        {/* <Tab.Screen name='Recipes' component={CategoryPage}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="list-alt" size={30} color={color} />
            ),
            tabBarActiveTintColor: '#61876E',
            tabBarInActiveTintColor: 'gray'
          }} />
        <Tab.Screen name='Add recipes' component={AddRecipe}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="playlist-add" size={30} color={color} />
            ),
            tabBarActiveTintColor: '#61876E',
            tabBarInActiveTintColor: 'gray'
          }} />
        <Tab.Screen name='RecipeList' component={RecipeList}
          options={{ tabBarButton: (props) => null }} />
        <Tab.Screen name='Recipe' component={Recipe}
          options={{ tabBarButton: (props) => null }} />
        <Tab.Screen name='EditRecipe' component={EditRecipe}
          options={{ tabBarButton: (props) => null }} /> */}


      </Tab.Navigator>
    </NavigationContainer>
  );
}
