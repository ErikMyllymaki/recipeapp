import React from 'react'
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import Styles from '../style/style';
// import { AntDesign } from '@expo/vector-icons';


export default function Recipe({ route, navigation }) {

  const { recipe } = route.params;

  const recipeImage = require('../images/dinner.jpg');

  return (
    <ScrollView>
    <View style={Styles.container}>
      {/* <Pressable onPress={() => navigation.navigate('RecipeList')}>
        <AntDesign name='left' size={30} color='#4B702F'/>
      </Pressable> */}
      <View style={Styles.recipeBackground}>
        <View style={{alignItems: 'center', }}>
          <Image source={recipeImage} style={Styles.recipeImage}></Image>
        </View>
        <View style={Styles.recipeInfo}>
          <Text style={Styles.pageHeader}>{recipe.name}</Text>
          <Text style={Styles.recipeSubtitle}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index}>{`\u2022 ${ingredient}`}</Text>
          ))}
          <Text style={Styles.recipeSubtitle}>Instructions:</Text>
          <Text>{recipe.instructions}</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}
