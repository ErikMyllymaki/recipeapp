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


// Hakukentästä jos muuttaa hakusanaa, hakee vain filteredRecipes -> pitää hakea kaikista resepteistä

export default function RecipeList({ navigation, route }) {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState([]);

  const category  = route.params.category;
  const filteredRecipes = recipes.filter(recipe => recipe.category === category.title);

  const [userKey, setUserKey] = useState('');

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
      <View key={item.key} style={Styles.recipeListItem}>
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
      refPath = FAVORITES_REF + userKey;
    }
    onValue(ref(db, refPath), (snapshot) => {
      const recipes = [];
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key)
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        // const recipe = { key, ...data };
        // if (recipe.category === 'Favorites' && recipe.userKey === userKey && recipe[key]) {
        //   favoriteRecipes.push(recipe);
        // }
        recipes.push({ key, ...data });
      });
      setRecipes(recipes);
    });
  }, [category.title]);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(db, USERS_REF + '/' + user.uid);
        onValue(userRef, snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setUserKey(user.uid);
            // console.log(userKey);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);


  // useEffect(() => {
  //   let refPath = RECIPES_REF;
  //   if (category.title === 'Favorites') {
  //     refPath = FAVORITES_REF + userKey;
  //   }
  
  //   onValue(ref(db, refPath), (snapshot) => {
  //     const recipes = [];
  //     snapshot.forEach((childSnapshot) => {
  //       // console.log(snapshot)
  //       // console.log(childSnapshot)
  //       console.log(childSnapshot.key)
  //       const key = childSnapshot.key;
  //       // console.log(key);
  //       const data = childSnapshot.val();
  //       if (key === RECIPES_REF) {
  //         console.log("moi")
  //         recipes.push({ key, ...data });
  //       }
  //     });
  //     setRecipes(recipes);
  //   });
  // }, [category.title, userKey]);
  
  // useEffect(() => {
  //   let refPath = RECIPES_REF;
  //   if (category.title === 'Favorites') {
  //     refPath = FAVORITES_REF + userKey;
  //   }
  
  //   onValue(ref(db, refPath), (snapshot) => {
  //     const recipes = [];
  //     snapshot.forEach((childSnapshot) => {
  //       const key = childSnapshot.key;
  //       const data = childSnapshot.val();
  //       if (key === RECIPES_REF) {
  //         console.log('moi');
  //         recipes.push({ key, ...data });
  //       } else {

  //       }
  //     });
  //     setRecipes(recipes);
  //   });
  // }, []);
  
  

  return (
    <View style={Styles.container}>
      <View style={{
        paddingTop: 20, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'
      }}>
        <TextInput value={text} onChangeText={search} style={Styles.searchInput} placeholder='Search' placeholderTextColor={'#3C6255'}/> 
        <Entypo name="magnifying-glass" style={{position: 'absolute', right: 20, top: 15, padding: 20}} size={30} color={'grey'} />
      </View>

      <View style={Styles.recipeList}>
        <Pressable onPress={() => navigation.navigate('Recipes')}>
          <AntDesign name='left' size={30} color='#4B702F' />
        </Pressable>
        <Text style={Styles.pageHeader}>{category.title}</Text>
      </View>
      <Button title='press' onPress={() => console.log(recipes)}/>
      <FlatList
        data={filteredRecipes}
        renderItem={renderReceptItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

