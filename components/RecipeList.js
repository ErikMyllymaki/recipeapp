import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const STORAGE_KEY = "@recipe_Key";

// "Each child in a list should have unique "key" prop" !!!
// Hakukentästä jos muuttaa hakusanaa, hakee vain filteredRecipes -> pitää hakea kaikista resepteistä

export default function RecipeList({navigation,route}) {

    const [text, setText] = useState('');
    const [recipes, setRecipes] = useState([]);

    const { category } = route.params;
    const filteredRecipes = recipes.filter(recipe => recipe.category === category.title);


    useEffect(() => {
        getData();
      }, [])

    const getData = async() => {
        try {
          return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
              if (json === null) {
                json = []
              }
              setRecipes(json);
              console.log(recipes)
              // console.log(json)
            })
            .catch (error => console.log(error));
        } catch (e) {
          console.log(e)
        }
      }

    // function search(keyword) {
    //     setText(keyword);
    //     const filteredRecipes = recipes.filter(r => r.name.includes(keyword));
    //     setRecipes(filteredRecipes);
    // }

    const navigateToRecipe = recipe => {
      navigation.navigate('Recipe', { recipe });
    };

    const renderReceptItem = ({ item }) => {
      // if (item.category === "route.params.recipe") {
        return (
          <TouchableOpacity key={item.key} onPress={() => navigateToRecipe(item)}>
            <Text style={Styles.categoryTitle}>{item.name}</Text>
          </TouchableOpacity>
        );
      // } else {
      //   return null;
      // }
    };
    
    return (
    <View style={Styles.container}>
        {/* <TextInput value={text} onChangeText={search} style={Styles.textInput} placeholder='Search' placeholderTextColor={'#3C6255'}/> */}
        <View style={Styles.recipeList}>
        <Pressable onPress={() => navigation.navigate('Recipes')}>
          <AntDesign name='left' size={30} color='#4B702F'/>
        </Pressable>
        <Text style={Styles.pageHeader}>{category.title}</Text>
        </View>
        <FlatList
            style={Styles.testi}
            data={filteredRecipes}
            renderItem={renderReceptItem}
            keyExtractor={(item) => item.key}
        />
    </View>
    )
}
