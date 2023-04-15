import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';



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

  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('Breakfast');

  const [recipes, setRecipes] = useState([]);


  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  const addNewRecipe = () => {
    if (recipeName.trim() !== "" && ingredients.length > 0 && instructions.trim() !== "") {
      const newRecipeItem = {
        recipeName: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
        userKey: userKey,
        nickname: nickname,
      };
      const newRecipeItemRef = push(ref(db, RECIPES_REF), newRecipeItem);
      const newRecipeItemKey = newRecipeItemRef.key;
      setRecipeName('');
      setIngredients([]);
      setInstructions('');
      setCategory('Breakfast');

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

      addNewRecipe();
    });
  }, [category]);

  const addIngredient = () => {
    if (ingredient.trim() != "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  }


  return (
    <ScrollView>
      <View style={Styles.container}>
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


        <TextInput
          ref={input => { this.textInput = input }}
          style={Styles.addRecipeInput}
          placeholder='+ Add ingredients'
          placeholderTextColor="#40793F"
          onChangeText={ingredient => setIngredient(ingredient)}
        />

        <TouchableOpacity
          style={Styles.addRecipeButton}
          onPress={() => {
            addIngredient();
          }} >
          <Text style={Styles.addRecipeButtonText}>Add ingredient</Text>

        </TouchableOpacity>
        {ingredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}
        <TextInput
          ref={input => { this.instructions = input }}
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
          onPress={() => {
            addNewRecipe();
            this.recipeName.clear();
            this.textInput.clear();
            this.instructions.clear();
          }}
        >
          <Text style={Styles.addRecipeButtonText}>Save recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
