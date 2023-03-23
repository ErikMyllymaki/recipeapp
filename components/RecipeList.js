import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@recipe_Key";

export default function Recipe() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getData();
        console.log(recipes)
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

    return (
        <View style={Styles.container}>
            {recipes.map((recipe) => (
            <View key={recipe.key}>
            <Text>{recipe.name}</Text>
            </View>
            ))
            }
        </View>
    )
}