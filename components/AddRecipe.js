import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@recipe_Key";

export default function AddRecipe() {

  const [recipeName, setRecipeName] = useState("");
  const [instructions, setInstructions] = useState("");
  // const [ingerdients, setIngerdients] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
    console.log(recipes)
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
    const newRecipe = { key: newKey.toString(), name: recipeName, instructions: instructions }
    const newRecipes = [...recipes, newRecipe]
    storeData(newRecipes)
    // console.log(newRecipes)
    getData();
    setInstructions("");
    setRecipeName("");
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
      <Button
        title="save recipe"
        onPress={saveRecipe} />
      {
        recipes.map((recipe) => (
          <View key={recipe.key} >
            <Text>name: {recipe.name}</Text>
            <Text>instructions: {recipe.instructions}</Text>
          </View>
        ))
      }
    </View>

  )
}
