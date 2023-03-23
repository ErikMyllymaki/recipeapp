import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import Styles from '../style/style';

const STORAGE_KEY = "@recipe_Key";

export default function AddRecipe() {

  const [recipes, setRecipes] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={Styles.container}>
        <Text>addrecipe</Text>
    </View>
  )
}
