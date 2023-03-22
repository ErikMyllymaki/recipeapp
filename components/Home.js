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
            <Text style={{ fontSize: 18 }}>Go to Recipes</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Add recipes')}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{ fontSize: 18 }}>Go to Add Recipes</Text>
          </Pressable>
        </View>
      );
}
