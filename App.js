// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Styles from './style/style';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import AddRecipe from './components/AddRecipe';
import About from './components/About';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-account" size={30} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInActiveTintColor: 'gray'
        }} />
        <Tab.Screen name='Recipes' component={CategoryPage}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="list-alt" size={30} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInActiveTintColor: 'gray'
        }} />
        <Tab.Screen name='Add recipes' component={AddRecipe} 
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="playlist-add" size={30} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInActiveTintColor: 'gray'
        }} />
        
        <Tab.Screen name='About' component={About}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="information-variant" size={30} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInActiveTintColor: 'gray'
          }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

