import React from 'react';
import Styles from '../style/style';
import { Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { db, RECIPES_REF, USERS_REF, FAVORITES_REF } from '../firebase/config';
import { child, push, ref, remove, update, onValue, set, get } from 'firebase/database';


export default function Header() {

    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(db, `${USERS_REF}/${user.uid}/nickname`);
        onValue(userRef, snapshot => {
          setUserNickname(snapshot.val() || '');
        });
      }
    }, []);

    const yourImage = require('../images/Logo.png');
    const screenWidth = Dimensions.get('window').width;


    return (
        <View style={Styles.header}>
            <Image source={yourImage} style={{ resizeMode: 'contain', height: 75}}></Image>
            <Text>{userNickname}</Text>
        </View>
    )
}