import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Button, ScrollView } from 'react-native';
import { signIn, resetPassword } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../style/style';
import { db, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';


export default Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [emailForgotPw, setEmailForgotPw] = useState('');
  const [nickname, setNickname] = useState('');


  const handlePress = () => {
    if (!email) {
      Alert.alert('Email is required.');
    }
    else if (!password) {
      Alert.alert('Password is required.');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          navigation.navigate('Home', { userUid: user.uid });
        }
      });
    }
  };

  const handlePressForgotPw = () => {
    setShowForgotPw(!showForgotPw);
  }

  const handlePressResetPw = () => {
    if (!emailForgotPw) {
      Alert.alert('Email is required.');
    }
    else {
      resetPassword(emailForgotPw);
      setShowForgotPw(false);
    }
  }

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#B5CFBB' }}>
        <Pressable
          style={styles.navigateBack}
          onPress={() => {
            navigation.navigate('Welcome');
          }}
        >

          <AntDesign name='left' size={30} color='#4B702F' />
          <Text style={styles.navigateBackHeader}>Welcome</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable onPress={handlePress} style={{ paddingVertical: 30, alignItems: 'center' }}>
          <Text style={styles.buttonStyle}>Login</Text>
        </Pressable>
        <Pressable style={{ paddingVertical: 30, alignItems: 'center', paddingTop: 0 }}>
          <Text onPress={handlePressForgotPw} style={styles.buttonStyle}>Forgot password</Text>
        </Pressable>
        {showForgotPw &&
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email*"
              value={emailForgotPw}
              onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable onPress={() => handlePressResetPw()} style={{ paddingVertical: 30, alignItems: 'center' }}>
              <Text style={styles.buttonStyle}>
                Reset password
              </Text>
            </Pressable>
            <Text style={[styles.infoText, { fontSize: 15, fontStyle: 'italic' }]}>
              Be sure to check your spam folder after resetting!
            </Text>
          </>
        }
        <Text style={styles.infoText}>Not having account yet?</Text>
        <Pressable onPress={() => navigation.navigate('Register')} style={{ paddingVertical: 30, alignItems: 'center' }}>
          <Text style={styles.buttonStyle}>Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}