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
            <Text style={{ fontSize: 18 }}>Recipes</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Add recipes')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{ fontSize: 18 }}>Add Recipe</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('About')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{ fontSize: 18 }}>About recipe app</Text>
          </Pressable>
        </View>
      );
}
