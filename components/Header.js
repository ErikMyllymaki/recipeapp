import React, { useState, useEffect } from 'react';
import Styles from '../style/style';
import { Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';
import { auth } from '../firebase/config';
import { db, USERS_REF } from '../firebase/config';
import { onValue, ref } from 'firebase/database';

export default function Header() {
  const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(db, `${USERS_REF}/${user.uid}/nickname`);
        onValue(userRef, snapshot => {
          setUserNickname('Logged in as ' + snapshot.val() || '');
        });
      } else {
        setUserNickname('');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const yourImage = require('../images/Logo.png');
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={Styles.header}>
      <Image source={yourImage} style={{ resizeMode: 'contain', height: 75 }} />
      <Text>{userNickname}</Text>
    </View>
  );
}
