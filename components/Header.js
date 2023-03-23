import React from 'react';
import Styles from '../style/style';
import { Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';




export default function Header() {

    const yourImage = require('../images/Logo.png');
    const screenWidth = Dimensions.get('window').width;


    return (
        <View style={Styles.header}>
            <Image source={yourImage} style={{ resizeMode: 'contain', height: 75}}></Image>
        </View>
    )
}
