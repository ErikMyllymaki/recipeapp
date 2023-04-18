import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF } from '../firebase/config';
import { Entypo } from '@expo/vector-icons';


export default function EditRecipe({ route }) {
    const { recipe } = route.params || {};
    const [recipeData, setRecipeData] = useState(null);
  
    useEffect(() => {
        console.log(recipe);
      if (recipe) {
        const recipeRef = ref(db, `${RECIPES_REF}/${recipe.key}`);
        onValue(recipeRef, (snapshot) => {
          setRecipeData(snapshot.val());
          console.log("Recipe data fetched:", snapshot.val());
        });
      }
    }, [recipe?.key]);
  
    return (
      <View style={Styles.container}>
        <Text>Recipe name </Text>
        <Text>{recipeData?.recipeName}</Text>
      </View>
    );
  }
