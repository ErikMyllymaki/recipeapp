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
          setUserNickname(
            <View style={Styles.userNicknameContainer}>
              <Text style={Styles.loggedInAsText}>Logged in as </Text>
              <Text style={Styles.userNickname}>{snapshot.val() || ''}</Text>
            </View>
          );
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
