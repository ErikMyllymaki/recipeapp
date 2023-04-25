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

export default function EditRecipe({ route, navigation }) {


  const [recipeData, setRecipeData] = useState(route.params.recipe);
  const [recipeKey, setRecipeKey] = useState(route.params?.recipeKey || '');


  const CATEGORIES_TITLES = ['Breakfast', 'Dinner', 'Drinks', 'Dessert', 'Snacks', 'Pastries'];

  // useEffect(() => {
  //   console.log("recipeName:", route.params.recipe.recipeName);
  // }, [route.params]);

  const [ingredientAmount, setIngredientAmount] = useState('');   
  const [unit, setUnit] = useState(null);
  const [recipeName, setRecipeName] = useState(route.params.recipe.recipeName);
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState(route.params.recipe.ingredients);
  const [instructions, setInstructions] = useState(route.params.recipe.instructions);
  const [image, setImage] = useState(route.params.recipe.image || null);
  const [servingSize, setServingSize] = useState(route.params.recipe.servingSize)
  const [category, setCategory] = useState(route.params.category.title);

  useEffect(() => {
    console.log(route.params.category.title)
    setRecipeKey(route.params.recipeKey);
    setRecipeData(route.params.recipe);
    setRecipeName(route.params.recipe.recipeName);
    setIngredients(route.params.recipe.ingredients);
    setInstructions(route.params.recipe.instructions);
    setServingSize(route.params.recipe.servingSize);
    setCategory(route.params.recipe.category);
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
      <Pressable
          style={Styles.navigateBack}
          onPress={() => {
            navigation.navigate('Recipe', { recipe: route.params.recipe, category: category});
          }}
        >

          <AntDesign name='left' size={30} color='#4B702F' />
          {/* <Text style={Styles.navigateBackHeader}>{category.title}</Text> */}
        </Pressable>
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
