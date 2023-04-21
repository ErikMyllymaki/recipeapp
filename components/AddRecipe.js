import React, { useState, useEffect } from 'react'
import { Image, View, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
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


const CATEGORIES_TITLES = [
  'Breakfast',
  'Dinner',
  'Drinks',
  'Dessert',
  'Snacks',
  'Pastries'
];

export default function AddRecipe() {

  const [userKey, setUserKey] = useState('');
  const [nickname, setNickname] = useState('');

  const [category, setCategory] = useState('Breakfast');
  const [recipeName, setRecipeName] = useState('');
  const [image, setImage] = useState(null);
  const [servingSize, setServingSize] = useState(0);
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [unit, setUnit] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');

  const [recipes, setRecipes] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  const addNewRecipe = () => {
    if (recipeName.trim() !== "" && ingredients.length > 0 && instructions.trim() !== "") {
      const newRecipeItem = {
        recipeName: recipeName,
        servingSize: servingSize,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
        userKey: userKey,
        nickname: nickname,
        image: image
      };
      const newRecipeItemRef = push(ref(db, RECIPES_REF), newRecipeItem);
      const newRecipeItemKey = newRecipeItemRef.key;
      setRecipeName('');
      setIngredients([]);
      setInstructions('');
      setCategory('Breakfast');
      setServingSize(0);
      return newRecipeItemKey;
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(db, USERS_REF + '/' + user.uid);
        onValue(userRef, snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setUserKey(user.uid);
            setNickname(userData.nickname);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const recipesRef = ref(db, RECIPES_REF);
    onValue(recipesRef, (snapshot) => {
      const recipesObject = snapshot.val();
      if (recipesObject) {
        const recipesList = Object.entries(recipesObject).map(([key, value]) => ({
          key,
          ...value,
        }));
        setRecipes(recipesList);
      } else {
        setRecipes([]);
      }
    });
  }, []);

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
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    const newIngredients = ingredients.filter((item) => item !== ingredient);
    setIngredients(newIngredients);
  };



  return (
    <ScrollView style={{ backgroundColor: '#B5CFBB' }}>
      <View style={[Styles.container,]}>
        <Text style={Styles.pageHeader}>ADD RECIPE</Text>

        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
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
          ref={input => { this.recipeName = input }}
          placeholder='+ Add name'
          placeholderTextColor="#40793F"
          style={Styles.addRecipeInput}
          onChangeText={setRecipeName}
        />


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
        </View>

        <NumericInput
          value={servingSize}
          onChange={setServingSize}
          rounded
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
          value={ingredient}
          type="text"
          ref={input => { this.textInput = input }}
          style={Styles.addRecipeInput}
          placeholder='+ Add ingredients'
          placeholderTextColor="#40793F"
          onChangeText={(text) => setIngredient(text)}
        />

        <TouchableOpacity
          style={Styles.addRecipeButton}
          onPress={() => {
            addIngredient();
          }} >
          <Text style={Styles.addRecipeButtonText}>Add ingredient</Text>

        </TouchableOpacity>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={Styles.ingredient}>
            <Text style={{ fontSize: 23 }}>{ingredient}</Text>
            <Pressable
              style={{ marginLeft: 15 }}
              onPress={() => handleRemoveIngredient(ingredient)}
            >
              <AntDesign name="close" size={23} />
            </Pressable>
          </View>
        ))}

        <TextInput
          ref={input => { this.instructions = input }}
          multiline={true}
          style={expanded ? [Styles.expandedAddRecipeInput, { textAlignVertical: 'top' }] : Styles.addRecipeInput}
          // onFocus={() => setExpanded(true)}
          // onBlur={() => setExpanded(false)}
          placeholder='+ Add instructions'
          placeholderTextColor="#40793F"
          onChangeText={text => setInstructions(text)}
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
          <Text style={[Styles.addRecipeButtonText, { paddingBottom: 60 }]}>Save recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
