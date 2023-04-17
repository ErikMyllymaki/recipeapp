import React, { useState, useEffect } from 'react';
import Styles from '../style/style';
import { Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';
import { db, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';




export default function Header() {

    const [userKey, setUserKey] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            const userRef = ref(db, USERS_REF + '/' + user.uid);
            onValue(userRef, snapshot => {
              const userData = snapshot.val();
              if (userData) {
                setUserKey(user.uid);
                setNickname(userData.nickname); 
              }
            });
          }
        });
      
        return () => unsubscribe();
      }, []);

    const yourImage = require('../images/Logo.png');
    const screenWidth = Dimensions.get('window').width;


    return (
        <View style={Styles.header}>
            <Image source={yourImage} style={{ resizeMode: 'contain', height: 75}}></Image>
            <Text>{nickname}</Text>
        </View>
    )
}