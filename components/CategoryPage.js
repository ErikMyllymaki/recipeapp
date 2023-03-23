import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Styles from '../style/style';

const CATEGORIES = [
  { id: '1', title: 'Breakfast' },
  { id: '2', title: 'Dinner' },
  { id: '3', title: 'Drinks' },
  { id: '4', title: 'Dessert' },
  { id: '5', title: 'Snacks' },
  { id: '6', title: 'Pastries' }
];

export default function CategoryPage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        Styles.categoryItem,
        selectedCategory.id === item.id && Styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={Styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.container}>
      <Text style={Styles.pageTitle}>Recipes</Text>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text style={Styles.selectedCategoryTitle}>{selectedCategory.title}</Text>
      {/* Display recipes for the selected category here */}
    </View>
  );
}
