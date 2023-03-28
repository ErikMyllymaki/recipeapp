import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from './CategoryPage';

const STORAGE_KEY = "@recipe_Key";

const CATEGORIES_TITLES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snacks',
  'Pastries'
];

export default function AddRecipe() {

  const [recipeName, setRecipeName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES_TITLES[0]);

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
      category: selectedCategory,
      name: recipeName,
      instructions: instructions,
      ingredients: ingredients
    }
    const newRecipes = [...recipes, newRecipe]
    storeData(newRecipes)
    console.log(newRecipes)
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
      <Text style={Styles.pageHeader}>ADD RECIPE</Text>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {CATEGORIES_TITLES.map((category) => (
          <Picker.Item
            key={category}
            label={category}
            value={category}
          />
        ))}
      </Picker>

      <TextInput
      placeholder='+ Add name'
      style={Styles.addRecipeInput}
        onChangeText={name => setRecipeName(name)}
      />

      
      <TextInput
      placeholder='+ Add instructions'
      style={Styles.addRecipeInput}
        onChangeText={text => setInstructions(text)}
      />
      

      <TextInput
        style={Styles.addRecipeInput}
        placeholder='+ Add ingredients'
        onChangeText={ingredient => setIngredient(ingredient)}
      />
      <Button
        title="Add ingredient"
        onPress={() => {
          setIngredients([...ingredients, ingredient]);
          setIngredient("");
        }}
      />
      { <Button 
      title='empty'
        onPress={emptyAsyncStorage}
      /> }
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
            <Text>cate: {recipe.category}</Text>
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
