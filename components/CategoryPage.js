import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Styles from '../style/style';

export const CATEGORIES = [
  { id: '1', title: 'Breakfast', image: require('../images/breakfast.png') },
  { id: '2', title: 'Dinner', image: require('../images/dinner.png') },
  { id: '3', title: 'Drinks', image: require('../images/drink.png') },
  { id: '4', title: 'Dessert', image: require('../images/dessert.png') },
  { id: '5', title: 'Snacks', image: require('../images/snacks.png') },
  { id: '6', title: 'Pastries', image: require('../images/bakedgoods.png') },
  { id: '7', title: 'Favorites', image: require('../images/dinner.png') } // new object for favorites
];

export default function CategoryPage({ navigation }) {
  // const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // const handleCategoryPress = (category) => {
  //   setSelectedCategory(category);
  // };

  const [navigationKey, setNavigationKey] = useState(false);


  const renderCategoryItem = ({ item }) => {
  
      return (
        <TouchableOpacity 
          style={Styles.categoryItem}
          onPress={() => {
            setNavigationKey((prevKey) => !prevKey);
            navigation.navigate('RecipeList', { category: item, navigationKey: navigationKey });
          }}
        >
          <ImageBackground source={item.image} style={Styles.categoryTitle}>
            <Text style={Styles.categoryName}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    
  };
  



  return (
    <View style={[Styles.container, { flex: 1, justifyContent: 'space-between' }]}>
      {/* <View style={{paddingTop: 20, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'}}>
          <Entypo name="magnifying-glass" style={{padding: 20}} size={30} color={'grey'} />
          <TextInput style={Styles.searchInput} />
        </View> */}

{/* <TouchableOpacity
        style={[
          Styles.categoryItem,
          // selectedCategory.id === item.id
        ]}

      ><Text style={Styles.categoryName}>Favorites</Text></TouchableOpacity> */}
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 65, 
          ...Platform.select({
            ios: {
              paddingHorizontal: 20,
              paddingTop: 30
            },
            android: {}
          })
        }}
      />


    </View>
  );
}
