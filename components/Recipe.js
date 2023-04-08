import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import Styles from '../style/style';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF } from '../firebase/config';

export default function Recipe({ route, navigation }) {

  const { recipe } = route.params || {}; 
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    if (recipe) { // check if recipe is defined
      const recipeRef = ref(db, `${RECIPES_REF}/${recipe.key}`);
      onValue(recipeRef, (snapshot) => {
        setRecipeData(snapshot.val());
      });
    }
  }, [recipe?.key]); 


  const recipeImage = require('../images/dinner.jpg');


  return (
    <ScrollView>
      <View style={Styles.container}>
        <View style={Styles.recipeBackground}>
        <View style={{ alignItems: 'center' }}>
          <Image source={recipeImage} style={Styles.recipeImage} />
          </View>
          <View style={Styles.recipeInfo}>
            <Text style={Styles.pageHeader}>{recipeData?.recipeName}</Text>
            <Text style={Styles.recipeSubtitle}>Ingredients: {recipeData?.ingredients}</Text>

            <Text style={Styles.recipeDescription}>{recipeData?.description}</Text>
            
            <Text style={Styles.recipeSubtitle}>Instructions: {recipeData?.instructions}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );


}