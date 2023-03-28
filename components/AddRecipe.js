import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from './CategoryPage';

const STORAGE_KEY = "@recipe_Key";

export default function AddRecipe() {

  const [recipeName, setRecipeName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const getData = async () => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
        .then(req => JSON.parse(req))
        .then(json => {
          if (json === null) {
            json = []
          }
          setRecipes(json);
          console.log(json)
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log(e)
    }
  }

  const saveRecipe = () => {
    const newKey = recipes.length + 1;
    const newRecipe = {
      key: newKey.toString(),
      name: recipeName,
      instructions: instructions,
      ingredients: ingredients
    }
    const newRecipes = [...recipes, newRecipe]
    storeData(newRecipes)
    getData();
  }

  const emptyAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log('AsyncStorage has been cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
    getData();
  }
  

  return (
    <View style={Styles.container}>
      <Text>addrecieae</Text>

      <Text>Add name</Text>
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, }}
        onChangeText={name => setRecipeName(name)}
      />

      <Text>Add instructions</Text>
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, }}
        onChangeText={text => setInstructions(text)}
      />
      <Text>Add ingredients:</Text>
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, }}
        onChangeText={ingredient => setIngredient(ingredient)}
      />
      <Button
        title="Add ingredient"
        onPress={() => {
          setIngredients([...ingredients, ingredient]);
          setIngredient("");
        }}
      />
      {/* <Button 
      title='empty'
        onPress={emptyAsyncStorage}
      /> */}
      <Text>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}

      <Button
        title="save recipe"
        onPress={saveRecipe} />
      {
        recipes.map((recipe) => (
          <View key={recipe.key} >
            <Text>name: {recipe.name}</Text>
            <Text>instructions: {recipe.instructions}</Text>
            <Text>Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index}>{ingredient}</Text>
            ))}
          </View>
        ))
      }
    </View>

  )
}
