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

  const [recipeData, setRecipeData] = useState(route.params?.recipeData || {});
  const [recipeKey, setRecipeKey] = useState(route.params?.recipeKey);
  const { recipe } = route.params || {};

  useEffect(() => {
    setRecipeKey(route.params?.recipeKey);
  }, [route.params?.recipeKey]);

  const CATEGORIES_TITLES = ['Breakfast', 'Dinner', 'Drinks', 'Dessert', 'Snacks', 'Pastries'];

  const [recipeName, setRecipeName] = useState(recipe.recipeName);
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [image, setImage] = useState(recipe.image);
  const [servingSize, setServingSize] = useState(recipe.servingSize)
  const [category, setCategory] = useState(recipe.category);
  const [userKey, setuserKey] = useState(recipe.userKey);
  // const [nickname, setNickname] = useState(recipe.nickname);



  useEffect(() => {
    setRecipeName(recipeName);
    setIngredients(ingredients);
    setInstructions(instructions);
    setServingSize(servingSize);
    setCategory(category);
    setuserKey(userKey);
    // setNickName(nickname);
    // setImage(recipeData?.image || null);
  }, [recipe]);

  const addIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  const updateRecipe = () => {
    const newRecipeData = {
      recipeName: recipeName,
      servingSize: servingSize,
      ingredients: ingredients,
      instructions: instructions,
      category: category,
      // userKey: userKey,
      // nickname: nickname,
      // image: image
    };
    if (recipeKey) {
      update(ref(db, RECIPES_REF + recipeKey), newRecipeData);
      alert("Recipe updated");
    }
  };

  
  
  

  return (
    <ScrollView style={{ backgroundColor: '#B5CFBB' }}>
      <View style={[Styles.container]}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Pressable
            style={Styles.navigateBack}
            onPress={() => {
              // console.log(recipe)
              navigation.navigate('RecipeList', { category: recipe.category });
            }}
          >
            <AntDesign name='left' size={30} color='#4B702F' style={{marginRight:15}}/>
          </Pressable>
          <Text style={Styles.pageHeader}>EDIT RECIPE</Text>
        </View>
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
            updateRecipe();
          }}


        >
          <Text style={[Styles.addRecipeButtonText, { paddingBottom: 60 }]}>Update recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
