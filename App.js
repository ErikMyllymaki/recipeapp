// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Styles from './style/style';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import About from './components/About';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundcolor: '#fff',
            borderRadius: 25,
            height: 50,
          }
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-account" size={30} color={color} />
          ),
          tabBarActiveTintColor: '#61876E',
          tabBarInActiveTintColor: 'gray'
        }} />
        <Tab.Screen name='Recipes' component={CategoryPage}
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

        <Tab.Screen name='About' component={About}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information-variant" size={30} color={color} />
            ),
            tabBarActiveTintColor: '#61876E',
            tabBarInActiveTintColor: 'gray'
          }} />

        <Tab.Screen name='RecipeList' component={RecipeList}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information-variant" size={30} color={color} />
            ),
            tabBarActiveTintColor: '#61876E',
            tabBarInActiveTintColor: 'gray'
          }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
