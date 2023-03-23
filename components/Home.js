
import React from 'react'
import { View, Text, Pressable } from 'react-native';
import Styles from '../style/style';
import { ImageBackground } from 'react-native';


export default function Home( {navigation} ) {

  const backgroundImage = require('../images/background.jpg');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground source={backgroundImage}>
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

