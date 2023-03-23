import React from 'react'
import { View, Text, Pressable } from 'react-native';
import Styles from '../style/style';


export default function Home( {navigation} ) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Home Screen</Text>
          <Pressable
            onPress={() => navigation.navigate('Recipes')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={Styles.homeButton}>Recipes</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Add recipes')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={Styles.homeButton}>Add Recipe</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('About')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={Styles.homeButton}>About recipe app</Text>
          </Pressable>
        </View>
      );
}
