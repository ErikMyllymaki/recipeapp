import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import Styles from '../style/style';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';

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

  const removeRecipe = (recipeKey) => {
    const updates = {};
    updates[`${RECIPES_REF}/${recipeKey}`] = null;
    update(ref(db), updates);
  };

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
            <Text style={Styles.recipeSubtitle}>Instructions: {recipeData?.instructions}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={() => removeRecipe(recipe.key)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <EvilIcons name="trash" size={40} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );


}