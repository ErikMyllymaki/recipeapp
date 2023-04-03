import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Styles from '../style/style';

export const CATEGORIES = [
  { id: '1', title: 'Breakfast', image: require('../images/breakfast.jpg') },
  { id: '2', title: 'Dinner', image: require('../images/dinner.jpg') },
  { id: '3', title: 'Drinks', image: require('../images/drink.jpg') },
  { id: '4', title: 'Dessert', image: require('../images/dessert.jpg') },
  { id: '5', title: 'Snacks', image: require('../images/snack.jpg') },
  { id: '6', title: 'Pastries', image: require('../images/pastry.jpg') }
];

export default function CategoryPage({ navigation }) {
  // const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // const handleCategoryPress = (category) => {
  //   setSelectedCategory(category);
  // };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        Styles.categoryItem,
        // selectedCategory.id === item.id
      ]}
      onPress={() => navigation.navigate('RecipeList', {category: item})}

    >
      <ImageBackground source={item.image} style={Styles.categoryTitle}><Text style={Styles.categoryName}>{item.title}</Text></ImageBackground>
    </TouchableOpacity>
  );

      

  return (
    <View style={[Styles.container, {flex: 1, justifyContent: 'space-between'}] }>

      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10, ...Platform.select({
          ios: {
            paddingHorizontal: 30
          },
          android: {}
        })}}
      />
    </View>
  );
}
