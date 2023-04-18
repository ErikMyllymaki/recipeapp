
import React from 'react'
import { View, Text, Pressable, Dimensions } from 'react-native';
import Styles from '../style/style';
import { ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { logout } from './Auth';


export default function Home( {navigation} ) {
  const [loaded] = useFonts({
    GeosansLight: require('../assets/fonts/GeosansLight.ttf'),
    TenorSans: require('../assets/fonts/TenorSans-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  const backgroundImage = require('../images/backgroundImage.jpg');
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  handlePress= () => {
    logout();
    console.log("Logged out");
}

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground source={backgroundImage} style={{width: screenWidth, height: screenHeight, alignItems:'center', justifyContent: 'center', resizeMode: 'contain'}}>
          <Pressable
            onPress={() => {
              handlePress();
              // navigation.navigate('Welcome');
            }}
            style={{ paddingVertical: 30 }}
          >
            <Text style={Styles.homeButton}>Logout</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Recipes')}
            style={{ paddingVertical: 30}}
          >
            <Text style={Styles.homeButton}>Recipes</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Add recipes')}
            style={{ paddingVertical: 30 }}
          >
            <Text style={Styles.homeButton}>Add Recipe</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('About')}
            style={{ paddingVertical: 30 }}
          >
            <Text style={Styles.homeButton}>About recipe app</Text>
          </Pressable>
          </ImageBackground>
        </View>
      );
}

