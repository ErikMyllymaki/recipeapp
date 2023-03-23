import React from 'react';
import Styles from '../style/style';
import { Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';




export default function Header() {
    return (
    <View style={Styles.header}>
        <Text style={Styles.title}>recipeap</Text>
    </View>

    )
}
