import React from 'react'
import { View, Text, Pressable } from 'react-native';
import Styles from '../style/style';
// import { AntDesign } from '@expo/vector-icons';


export default function Recipe({ route, navigation }) {

  const { recipe } = route.params;

  return (
    <View style={Styles.container}>
      {/* <Pressable onPress={() => navigation.navigate('RecipeList')}>
        <AntDesign name='left' size={30} color='#4B702F'/>
      </Pressable> */}
      <View style={Styles.recipeBackground}>
        <Text style={Styles.recipeImage}>KUVA</Text>
        <Text style={Styles.pageHeader}>{recipe.name}</Text>
        <Text style={Styles.recipeSubtitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index}>{`\u2022 ${ingredient}`}</Text>
        ))}
        <Text style={Styles.recipeSubtitle}>Instructions:</Text>
        <Text>{recipe.instructions}</Text>
      </View>

    </View>
  )
}
