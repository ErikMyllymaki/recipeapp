import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@recipe_Key";

// "Each child in a list should have unique "key" prop" !!!
// Hakukentästä jos muuttaa hakusanaa, hakee vain filteredRecipes -> pitää hakea kaikista resepteistä

export default function RecipeList() {

    const [text, setText] = useState('');
    const [recipes, setRecipes] = useState([]);

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
              console.log(json)
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

    const renderReceptItem = ({ item }) => (
        <TouchableOpacity>
          <Text style={Styles.categoryTitle}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
    <View style={Styles.container}>
        <TextInput value={text} onChangeText={search} style={Styles.textInput} placeholder='Search' placeholderTextColor={'#3C6255'}/>
        <Text style={Styles.pageHeader}>CATEGORY*</Text>
        <FlatList
            style={Styles.testi}
            data={recipes}
            renderItem={renderReceptItem}
            keyExtractor={(item) => item.id}
        />
    </View>
    )
}
