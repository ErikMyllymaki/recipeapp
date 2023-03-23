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


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
              screenOptions={{ headerShown: false }}
        >
        <Tab.Screen name="Home" component={Home} options={{ tabBarStyle: { display: 'none' } }}/>
        <Tab.Screen name='Recipes' component={CategoryPage} />
        <Tab.Screen name='Add recipes' component={AddRecipe} />
        <Tab.Screen name='About' component={About} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

