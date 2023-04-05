import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { STORAGE_KEY } from './AddRecipe';


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

    function search(keyword) {
        setText(keyword);
        const filteredRecipes = recipes.filter(r => r.name.includes(keyword));
        setRecipes(filteredRecipes);
    }

    const navigateToRecipe = recipe => {
      navigation.navigate('Recipe', { recipe });
    };

    const renderReceptItem = ({ item }) => {
        return (
        //   <View style={{paddingTop: 20, justifyContent: 'center',
        // alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity key={item.key} onPress={() => navigateToRecipe(item)}>
              <Text style={Styles.recipeListItem}>{item.name}</Text>
            </TouchableOpacity>
          // </View>
          
        );
    };
    
    return (
    <View style={Styles.container}>
      <View style={{paddingTop: 20, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'}}>
          <TextInput value={text} onChangeText={search} style={Styles.searchInput} placeholder='Search' placeholderTextColor={'#3C6255'}/>
      </View>
        
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
