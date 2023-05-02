import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Button, TouchableWithoutFeedback, Alert } from 'react-native';
import Styles from '../style/style';
import { child, push, ref, remove, update, onValue, set, get } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF, FAVORITES_REF } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
import { auth } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import EditRecipe from './EditRecipe';
import { storage } from '../firebase/config.js';
import FavoriteButton from './FavoriteButton';


export default function Recipe({ route, navigation }) {

  const recipe = route.params.recipe;

  const [recipeKey, setRecipeKey] = useState(recipe.key);
  const [recipeData, setRecipeData] = useState(null);
  const [userKey, setUserKey] = useState('');
  const [navigationKey, setNavigationKey] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const category = route.params.category;

  useEffect(() => {
    if (recipe) {
      setRecipeKey(recipe.key);
      const recipeRef = ref(db, `${RECIPES_REF}/${recipe.key}`);
      onValue(recipeRef, (snapshot) => {
        setRecipeData(snapshot.val());
      });
    }
  }, [recipe]);



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
    updates[`favorites/${userKey}/${recipeKey}`] = null;
    update(ref(db), updates);
  };

  const createTwoButtonAlert = () => Alert.alert(
    "RecipeHub",
    "Remove recipe?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          removeRecipe(recipe.key);
          navigation.navigate('RecipeList', { category: category });
        }
      }
    ],
    { cancelable: false }
  );







  return (
    <ScrollView style={Styles.scrollView}>
      <View style={Styles.container}>
        <Pressable
          style={Styles.navigateBack}
          onPress={() => {
            setNavigationKey((prevKey) => !prevKey);
            navigation.navigate('RecipeList', { category: category, navigationKey: navigationKey });
          }}
        >

          <AntDesign name='left' size={30} color='#4B702F' />
          <Text style={Styles.navigateBackHeader}>{category.title}</Text>
        </Pressable>
        <View style={Styles.recipeBackground}>
          <View style={Styles.recipeImageView}>
            <Image source={{uri: recipeData?.image}} style={Styles.recipeImage} />
          </View>
          <View style={Styles.recipeInfo}>
            <Text style={Styles.madeByText}>by: {recipeData?.nickname}</Text>
            <Text style={Styles.pageHeader}>{recipeData?.recipeName}</Text>
            <Text style={Styles.recipeSubtitle}>Serving size:</Text>
            {recipeData?.servingSize > 1 ? 
            <Text>{recipeData?.servingSize} servings</Text>
            : 
            <Text>{recipeData?.servingSize} serving</Text>}
            <Text style={Styles.recipeSubtitle}>Ingredients:</Text>
            {recipeData?.ingredients.map((ingredient, index) => (
              <Text key={index}>{`\u2022 ${ingredient}`}</Text>
            ))}
            <Text style={Styles.recipeSubtitle}>Instructions:</Text>
            <Text>{recipeData?.instructions}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -5 }}>
              {userKey === recipeData?.userKey && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('EditRecipe', { recipe: recipe, recipeKey: recipeKey, category: category });
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EvilIcons name="pencil" size={40} style={Styles.recipeIcons}/>
                  </View>
                </TouchableWithoutFeedback>
              )}

              {userKey === recipeData?.userKey && (
                <TouchableWithoutFeedback onPress={() => { createTwoButtonAlert(); }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EvilIcons name="trash" size={40} style={Styles.recipeIcons}/>
                  </View>
                </TouchableWithoutFeedback>
              )}
              <View style={{paddingTop: 25, paddingLeft: 4}}>
              <FavoriteButton recipeKey={recipeKey} userKey={userKey} navigation={recipe} handleRefresh={handleRefresh}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );


}