import React from 'react'
import { View, Text } from 'react-native';
import Styles from '../style/style';

export default function Recipe({route}) {

  const { recipe } = route.params;

  return (
    <View style={Styles.container}>
        <Text>{recipe.name}</Text>
    </View>
  )
}
