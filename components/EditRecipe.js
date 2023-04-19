import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import NumericInput from 'react-native-numeric-input'

export default function EditRecipe({ route }) {

  const { recipeData } = route.params || {};

  const CATEGORIES_TITLES = ['Breakfast', 'Dinner', 'Drinks', 'Dessert', 'Snacks', 'Pastries'];

  const [recipeName, setRecipeName] = useState(recipeData?.recipeName || '');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);
  const [instructions, setInstructions] = useState(recipeData?.instructions || '');
  const [image, setImage] = useState(recipeData?.image || null);
  const [servingSize, setServingSize] = useState(recipeData?.servingSize || 0)
  const [category, setCategory] = useState(recipeData?.category || '');

  const addIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  const addNewRecipe = () => {
    const newRecipeData = {
      recipeName,
      ingredients,
      instructions,
      image,
      servingSize,
      category,
    };
    // Do something with the new recipe data...
  };

  return (
    <ScrollView style={{ backgroundColor: '#B5CFBB' }}>
      <View style={[Styles.container,]}>
        <Text style={Styles.pageHeader}>EDIT RECIPE</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          {CATEGORIES_TITLES.map((category) => (
            <Picker.Item
              key={category}
              label={category}
              value={category}
            />
          ))}
        </Picker>
        <TextInput
          ref={input => { this.recipeName = input }}
          placeholderTextColor="#40793F"
          style={Styles.addRecipeInput}
          onChangeText={setRecipeName}
          value={recipeName}
        />
        <NumericInput
          onChange={setServingSize}
          rounded
          value={servingSize}
        />
        <TextInput
          ref={input => { this.textInput = input }}
          style={Styles.addRecipeInput}
          placeholder='+ Add ingredients'
          placeholderTextColor="#40793F"
          onChangeText={ingredient => setIngredient(ingredient)}
          value={ingredient}
        />
        <TouchableOpacity
          style={Styles.addRecipeButton}
          onPress={addIngredient}
        >
          <Text style={Styles.addRecipeButtonText}>Add ingredient</Text>
        </TouchableOpacity>
        {ingredients.map((ingredient, index) => (
          <View style={Styles.ingredient} key={index}>
            <Text style={{ fontSize: 23 }}>{ingredient}</Text>
            <Pressable
              style={{ marginLeft: 15 }}
              onPress={() => handleRemoveIngredient(ingredient)}
            >
              <AntDesign name='close' size={23} />
            </Pressable>
          </View>
        ))}
        <TextInput
          ref={input => { this.instructions = input }}
          multiline={true}
          style={Styles.addRecipeInput}
          placeholder='+ Add instructions'
          placeholderTextColor="#40793F"
          onChangeText={text => setInstructions(text)}
          value={instructions}
        />
        <TouchableOpacity
          style={Styles.addRecipeButton}
          onPress={() => {
            addNewRecipe();
            this.recipeName.clear();
            this.textInput.clear();
            this.instructions.clear();
          }}


        >
          <Text style={[Styles.addRecipeButtonText, { paddingBottom: 60 }]}>Update recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
