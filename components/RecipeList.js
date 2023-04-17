import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
// import { STORAGE_KEY } from './AddRecipe';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF } from '../firebase/config';
import { Entypo } from '@expo/vector-icons';


// Hakukentästä jos muuttaa hakusanaa, hakee vain filteredRecipes -> pitää hakea kaikista resepteistä

export default function RecipeList({ navigation, route }) {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState([]);

  const category  = route.params.category;
  const filteredRecipes = recipes.filter(recipe => recipe.category === category.title);

  function search(keyword) {
    // setText(keyword);
    // const filteredRecipes = recipes.filter(r => r.name.includes(keyword) && r.category === category.title);
    // setFilteredRecipes(filteredRecipes);
    
  }

  const renderReceptItem = ({ item }) => {
    const navigateToRecipe = () => {
      navigation.navigate('Recipe', { recipe: item });
      
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
    onValue(ref(db, RECIPES_REF), (snapshot) => {
      const recipes = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        recipes.push({ key, ...data });
      });
      setRecipes(recipes);
    });
  }, []);

  return (
    <View style={Styles.container}>
      <View style={{
        paddingTop: 20, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'
      }}>
        <TextInput value={text} onChangeText={search} style={Styles.searchInput} placeholder='Search' placeholderTextColor={'#3C6255'}> 
          <Entypo name="magnifying-glass" style={{padding: 20}} size={30} color={'grey'} />
        </TextInput>

      </View>

      <View style={Styles.recipeList}>
        <Pressable onPress={() => navigation.navigate('Recipes')}>
          <AntDesign name='left' size={30} color='#4B702F' />
        </Pressable>
        <Text style={Styles.pageHeader}>{category.title}</Text>
      </View>
      <FlatList
        data={filteredRecipes}
        renderItem={renderReceptItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

