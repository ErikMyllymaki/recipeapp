import React from 'react';
import Styles from '../style/styles';
import { Text, View } from 'react-native';


export default function Header() {
    return (
    <View style={Styles.header}>
        <Text style={Styles.title}>Mini-Yahtzee</Text>
    </View>

    )
}
