import React from 'react'
import { View, Text, Pressable } from 'react-native';
import Styles from '../style/style';
// import { AntDesign } from '@expo/vector-icons';


export default function Recipe({route, navigation}) {

  const { recipe } = route.params;

  return (
    <View style={Styles.container}>
          {/* <Pressable onPress={() => navigation.navigate('RecipeList')}>
          <AntDesign name='left' size={30} color='#4B702F'/>
        </Pressable> */}
        <Text style={Styles.pageHeader}>{recipe.name}</Text>
      </View>
  )
}
