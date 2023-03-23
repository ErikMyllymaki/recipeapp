import React, { useState } from 'react'
import { View, Text } from 'react-native';
import Styles from '../style/style';


export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  return (
    <View style={Styles.container}>
        {recipes.map((recipe) => (
        <View>
          <Text>{recipe.name}</Text>
          <Text>{recipe.ingredients}</Text>
          <Text>{recipe.instructions}</Text>
        </View>
        ))
        }
    </View>
  )
}
