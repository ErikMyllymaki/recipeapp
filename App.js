// import { StatusBar } from 'expo-status-bar';
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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';


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
            bottom: 8,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundcolor: '#fff',
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

        <Tab.Screen name='Welcome' component={Welcome}
          options={{ tabBarButton: (props) => null }} />
        <Tab.Screen name='Login' component={Login}
          options={{ tabBarButton: (props) => null }} /> 
          <Tab.Screen name='Register' component={Register}
            options={{ tabBarButton: (props) => null }} />

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

        {/* <Tab.Screen name='RecipeList' component={RecipeList}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information-variant" size={30} color={color} />
            ),
            tabBarActiveTintColor: '#61876E',
            tabBarInActiveTintColor: 'gray'
          }} /> */}
        <Tab.Screen name='RecipeList' component={RecipeList}
          options={{ tabBarButton: (props) => null }} />
        <Tab.Screen name='Recipe' component={Recipe}
          options={{ tabBarButton: (props) => null }} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}
