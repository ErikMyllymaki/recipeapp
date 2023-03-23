import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import Styles from '../style/style';

const STORAGE_KEY = "@recipe_Key";

export default function AddRecipe() {

  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
    }catch (e) {
      console.log(e)
    }
  }

  const saveRecipe = () => {
    const newKey = todos.length + 1;
    const newRecipe = {key: newKey.toString(), name: recipeName}
    const newRecipes = [...recipes, newRecipe]
    storeData(newRecipes)
  }

  return (
    <View style={Styles.container}>
        <Text>addrecieasdasdpe</Text>
    </View>
  )
}
