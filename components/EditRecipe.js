import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { child, push, ref, remove, update, onValue, Database } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
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
  const [unit, setUnit] = useState('');
  const [recipeName, setRecipeName] = useState(route.params.recipe.recipeName);
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState(route.params.recipe.ingredients);
  const [instructions, setInstructions] = useState(route.params.recipe.instructions);
  const [image, setImage] = useState(route.params.recipe.image || null);
  const [servingSize, setServingSize] = useState(route.params.recipe.servingSize)
  const [category, setCategory] = useState(route.params.category.title);

  useEffect(() => {
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

    if (ingredient == '') {
      alert('Ingredient required!');
    } else if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setIngredientAmount('');
      setUnit('');
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

  const showAlert = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to go back without saving?',
      [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {navigation.navigate('Recipe', { recipe: route.params.recipe, category: route.params.category })}
      },
    ],
    {
      cancelable: true
    }
    )
  }


  return (

    <ScrollView style={Styles.scrollView}>
      <View style={[Styles.container, {paddingBottom: 65}]}>
        <Pressable
          style={Styles.navigateBack}
          onPress={() => {
            showAlert();
            // navigation.navigate('Recipe', { recipe: route.params.recipe, category: route.params.category });
          }}
        >
          <AntDesign name='left' size={30} color='#4B702F' />
          <Text style={Styles.navigateBackHeader}>Recipe</Text>
        </Pressable>
        <Text style={Styles.pageHeader}>EDIT RECIPE</Text>

        <View style={{margin: 8}}>
        <Text style={Styles.addRecipeLabel}>Choose category</Text>
        <View style={Styles.dropdown}>
          <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          itemStyle={{ height: 45 }}>
          {CATEGORIES_TITLES.map((category) => (
            <Picker.Item
              key={category}
              label={category}
              value={category}
            />
          ))}
        </Picker>
        </View>
        
        <Text style={Styles.addRecipeLabel}>Recipe name</Text>

        <TextInput
          ref={input => { this.recipeName = input }}
          placeholder='Name'
          style={Styles.addRecipeTextInput}
          onChangeText={setRecipeName}
          value={recipeName}
        />

        <Text style={Styles.addRecipeLabel}>Amount of portions:</Text>  

        <TextInput
          value={servingSize}
          style={Styles.addRecipeTextInput}
          type="text"
          keyboardType='number-pad'
          placeholder='0'
          onChangeText={(text) => setServingSize(text)}
        />

        <Text style={Styles.addRecipeLabel}>Add ingredients</Text>

        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
            value={ingredientAmount}
            style={[Styles.addRecipeTextInput, { flex: 0.5, height: 50 }]}
            type="text"
            keyboardType='number-pad'
            placeholder='0'
            onChangeText={(text) => setIngredientAmount(text)}
          />

<View style={[Styles.unitDropdown, {flex: 2.5}]}>
            <Picker
              selectedValue={unit}
              type="text"
              onValueChange={(value) => setUnit(value)}
              itemStyle={{ height: 50 }}
              style={{fontSize: 10}}
              >
              <Picker.Item style={{fontSize: 14}} label='Unit' value="" />
              <Picker.Item style={{fontSize: 14}} label='ml' value="ml" />
              <Picker.Item style={{fontSize: 14}} label='dl' value="dl" />
              <Picker.Item style={{fontSize: 14}} label='l' value="l" />
              <Picker.Item style={{fontSize: 14}} label='tsp' value="tsp" />
              <Picker.Item style={{fontSize: 14}} label='tblsp' value="tblsp" />
              <Picker.Item style={{fontSize: 14}} label='g' value="g" />
              <Picker.Item style={{fontSize: 14}} label='kg' value="kg" />
              <Picker.Item style={{fontSize: 14}} label='pcs' value="pcs" />
              <Picker.Item style={{fontSize: 14}} label='cup' value="cup" />
              <Picker.Item style={{fontSize: 14}} label='cups' value="cups" />
              <Picker.Item style={{fontSize: 14}} label='pound' value="pound" />
            </Picker>
          </View>

          <TextInput
            value={ingredient}
            type="text"
            ref={input => { this.textInput = input }}
            style={[Styles.addRecipeTextInput, { flex: 3 }]}
            placeholder='Ingredient'
            onChangeText={(text) => setIngredient(text)}
          />

<Pressable
            style={{ alignItems: 'center', flex: 1.5 }}
            onPress={() => {
              addIngredient();
            }} >
            <Text style={Styles.addButton}>Add</Text>
          </Pressable>
        </View>

        {ingredients.map((ingredient, index) => (
          <View style={Styles.ingredient} key={index}>
            <Text style={{ fontSize: 16 }}>{ingredient}</Text>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => handleRemoveIngredient(ingredient)}
            >
              <EvilIcons name='trash' size={30} />
            </Pressable>
          </View>
        ))}

<Text style={Styles.addRecipeLabel}>Add instructions</Text>

<TextInput
          ref={input => { this.instructions = input }}
          multiline={true}
          style={Styles.addRecipeTextInput}
          placeholder='Instructions'
          onChangeText={text => setInstructions(text)}
          value={instructions}
        />



        <Pressable
          style={{ alignItems: 'center', marginTop: 15 }}
          onPress={() => {
            updateRecipe();
          }}
        >
          <Text style={Styles.buttonStyle}>Update recipe</Text>
        </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
