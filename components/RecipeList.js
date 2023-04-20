import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
// import { STORAGE_KEY } from './AddRecipe';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF, FAVORITES_REF, USERS_REF } from '../firebase/config';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase/config';


export default function RecipeList({ navigation, route }) {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const category = route.params.category;
  const navigationKey = route.params.navigationKey;
  const filteredRecipes = recipes.filter(recipe => recipe.category === category.title);
  const [userKey, setUserKey] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  function search(keyword) {
    // setText(keyword);
    // const filteredRecipes = recipes.filter(r => r.name.includes(keyword) && r.category === category.title);
    // setFilteredRecipes(filteredRecipes);

  }

  const renderReceptItem = ({ item }) => {
    const navigateToRecipe = () => {
      navigation.navigate('Recipe', { recipe: item, category: category });

    };

    return (
      <View key={item.key}>
        <TouchableOpacity style={Styles.recipeListItem} onPress={navigateToRecipe}>
          <Image source={require('../images/breakfast.jpg')} style={Styles.recipeListImage} />
          <Text>{item.recipeName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    let refPath = RECIPES_REF;
    if (category.title === 'Favorites') {
      const favoritesRef = ref(db, FAVORITES_REF + userKey);
      const recipesRef = ref(db, RECIPES_REF);
      const favoriteRecipeKeys = [];
      onValue(favoritesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val() === true) {
            favoriteRecipeKeys.push(childSnapshot.key);
          }
        });
        const favoriteRecipes = [];
        onValue(recipesRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const recipeKey = childSnapshot.key;
            if (favoriteRecipeKeys.includes(recipeKey)) {
              favoriteRecipes.push({ key: recipeKey, ...childSnapshot.val() });
            }
          });
          setRecipes(favoriteRecipes);
        });
      });
    } else {
      onValue(ref(db, refPath), (snapshot) => {
        const recipes = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          // console.log(data.category)
          if (category.title === data.category) {
            recipes.push({ key, ...data });
          }
        });
        setRecipes(recipes);
      });
    }
  }, [category.title, userKey, navigationKey]);
  


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


  return (
    <View style={Styles.container}>
      <View style={{
        paddingTop: 20, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'
      }}>
        <TextInput value={text} onChangeText={search} style={Styles.searchInput} placeholder='Search' placeholderTextColor={'#3C6255'} />
        <Entypo name="magnifying-glass" style={{ position: 'absolute', right: 20, top: 15, padding: 20 }} size={30} color={'grey'} />
      </View>

      <View style={Styles.recipeList}>
        <Pressable onPress={() => navigation.navigate('Recipes')}>
          <AntDesign name='left' size={30} color='#4B702F' />
        </Pressable>
        <Text style={Styles.pageHeader}>{category.title}</Text>
      </View>
      {/* <Button title='press' onPress={() => console.log('recipes')} /> */}
      <FlatList
        data={recipes}
        renderItem={renderReceptItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

