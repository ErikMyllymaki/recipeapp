import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { child, push, ref, remove, update, onValue, Database } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import NumericInput from 'react-native-numeric-input'

export default function EditRecipe({ route }) {

  // console.log("route.params: ", route.params);
  // console.log(route.params.recipe.recipeName)


  const [recipeData, setRecipeData] = useState(route.params.recipe);
  const [recipeKey, setRecipeKey] = useState(route.params?.recipeKey || '');

  useEffect(() => {
    // setRecipeData(route.params || {});
    console.log("moi")
  }, [route.params?.recipeData]);

  const CATEGORIES_TITLES = ['Breakfast', 'Dinner', 'Drinks', 'Dessert', 'Snacks', 'Pastries'];

  useEffect(() => {
    console.log("recipeName:", recipeName);
  }, [recipeName]);

  const [ingredientAmount, setIngredientAmount] = useState('');   
  const [unit, setUnit] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);
  const [instructions, setInstructions] = useState(recipeData?.instructions || '');
  const [image, setImage] = useState(recipeData?.image || null);
  const [servingSize, setServingSize] = useState(recipeData?.servingSize || 0)
  const [category, setCategory] = useState(recipeData?.category || '');

  useEffect(() => {
    setRecipeData(route.params.recipe);
    console.log(recipeData)
    setRecipeName(recipeData.recipeName);
    setIngredients(recipeData.ingredients);
    setInstructions(recipeData.instructions);
    setServingSize(recipeData.servingSize);
    setCategory(recipeData.category);
  }, [route.params]);

  const addIngredient = () => {

    const newIngredient = ingredientAmount + ' ' + unit + ' ' + ingredient;
    
    if (!unit || ingredientAmount == '' || ingredient == '') {
      alert('Amount, unit and ingredient required!');
    } else if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setIngredientAmount('');
      setUnit(null);
      setIngredient('');
    } 

    // if (ingredient) {
    //   setIngredients([...ingredients, ingredient]);
    //   setIngredient('');
    // }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  const updateRecipe = () => {
    const newRecipeData = {
      recipeName,
      ingredients,
      instructions,
      servingSize,
      category,
    };
    update(ref(db, RECIPES_REF + recipeKey), newRecipeData);
    alert("Recipe updated");
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
          value={ingredientAmount}
          style={Styles.addRecipeInput}
          type="text"
          keyboardType='number-pad'
          placeholder='amount'
          onChangeText={(text) => setIngredientAmount(text)}
        />

        <Picker
          selectedValue={unit}
          type="text"
          onValueChange={(value) => setUnit(value)}>
          <Picker.Item label='Select unit' value={null} />
          <Picker.Item label='dl' value="dl"/>
          <Picker.Item label='kpl'value="kpl"/>
        </Picker>

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
            updateRecipe();
          }}


        >
          <Text style={[Styles.addRecipeButtonText, { paddingBottom: 60 }]}>Update recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
