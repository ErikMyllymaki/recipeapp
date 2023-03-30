import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = "@recipe_Key";

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
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
      ingredients: ingredients,
      isFavorite: isFavorite,
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
        placeholderTextColor="#40793F"
        style={Styles.addRecipeInput}
        onChangeText={name => setRecipeName(name)}
      />


      <TextInput
        style={Styles.addRecipeInput}
        placeholder='+ Add ingredients'
        placeholderTextColor="#40793F"
        onChangeText={ingredient => setIngredient(ingredient)}
      />
<TouchableOpacity
  style={Styles.addRecipeButton}
  onPress={() => {
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  }}
>
  <Text style={Styles.addRecipeButtonText}>Add ingredient</Text>
</TouchableOpacity>
      {/* <Button 
      title='empty'
        onPress={emptyAsyncStorage}
      />  */}
      <Text>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}

      <TextInput
        multiline={true}
        style={expanded ? [Styles.expandedAddRecipeInput, { textAlignVertical: 'top' }] : Styles.addRecipeInput}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        placeholder='+ Add instructions'
        placeholderTextColor="#40793F"
        onChangeText={text => setInstructions(text)}
      />

      <TouchableOpacity
        style={Styles.addRecipeButton}
        onPress={saveRecipe}>
        <Text style={Styles.addRecipeButtonText}>Save recipe</Text>
      </TouchableOpacity>
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
