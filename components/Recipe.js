import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import Styles from '../style/style';
import { child, push, ref, remove, update, onValue, set, get } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF, FAVORITES_REF } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
import { auth } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import EditRecipe from './EditRecipe';

export default function Recipe({ route, navigation }) {

  const { recipe } = route.params || {};
  const [recipeData, setRecipeData] = useState(null);
  const [userKey, setUserKey] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [navigationKey, setNavigationKey] = useState(0);

  const category = route.params.category;

  useEffect(() => {
    if (recipe) { // check if recipe is defined
      const recipeRef = ref(db, `${RECIPES_REF}/${recipe.key}`);
      onValue(recipeRef, (snapshot) => {
        setRecipeData(snapshot.val());
      });
    }

  }, [recipe?.key]);

  useEffect(() => {
    if (userKey && recipe) {
      const userFavoritesRef = ref(db, `${FAVORITES_REF}/${userKey}`);
      onValue(userFavoritesRef, snapshot => {
        const favorites = snapshot.val() || {};
        setIsFavorite(favorites[recipe.key]);
      });
    }
  }, [userKey, recipe?.key]);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(db, USERS_REF + '/' + user.uid);
        onValue(userRef, snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setUserKey(user.uid);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);


  const removeRecipe = (recipeKey) => {
    const updates = {};
    updates[`${RECIPES_REF}/${recipeKey}`] = null;
    update(ref(db), updates);
  };

  const addFavorite = (recipeKey, userKey) => {
    const userFavoritesRef = ref(db, `favorites/${userKey}/${recipeKey}`);

    get(userFavoritesRef).then((snapshot) => {
      if (snapshot.exists()) {
        remove(userFavoritesRef).then(() => setIsFavorite(false));
      } else {
        set(userFavoritesRef, true).then(() => setIsFavorite(true));
      }
    });
  };


  const recipeImage = require('../images/dinner.jpg');


  return (
    <ScrollView>
      <View style={Styles.container}>
        <Pressable
          style={Styles.navigateBack}
          onPress={() => {
            setNavigationKey((prevKey) => prevKey + 1);
            navigation.navigate('RecipeList', { category: category, navigationKey: navigationKey });
            console.log(category.title)
          }}
        >

          <AntDesign name='left' size={30} color='#4B702F' />
          <Text style={Styles.navigateBackHeader}>{category.title}</Text>
        </Pressable>
        <View style={Styles.recipeBackground}>
          <View style={{ alignItems: 'center' }}>
            <Image source={recipeImage} style={Styles.recipeImage} />
          </View>
          <View style={Styles.recipeInfo}>
            <Text style={Styles.pageHeader}>{recipeData?.recipeName}</Text>
            <Text style={Styles.recipeSubtitle}>Serving size:</Text>
            <Text>{recipeData?.servingSize} serving(s)</Text>
            <Text style={Styles.recipeSubtitle}>Ingredients:</Text>
            {recipeData?.ingredients.map((ingredient, index) => (
              <Text key={index}>{`\u2022 ${ingredient}`}</Text>
            ))}
            <Text style={Styles.recipeSubtitle}>Instructions:</Text>
            <Text>{recipeData?.instructions}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {userKey === recipeData?.userKey && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(recipeData);
                    navigation.navigate('EditRecipe', { recipeData });
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EvilIcons name="pencil" size={40} />
                  </View>
                </TouchableWithoutFeedback>
              )}

              {userKey === recipeData?.userKey && (
                <TouchableWithoutFeedback onPress={() => { removeRecipe(recipe.key); navigation.navigate('RecipeList', { category: category }) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EvilIcons name="trash" size={40} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback onPress={() => addFavorite(recipe.key, userKey)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={isFavorite ? "#CA3433" : "gray"} // Change color based on isFavorite state
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );


}