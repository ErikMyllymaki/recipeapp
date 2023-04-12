import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Button } from 'react-native';
import { signIn, resetPassword } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../style/style';
import { auth } from '../firebase/config';

export default Login = ( { navigation } ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [emailForgotPw, setEmailForgotPw] = useState('');

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
          navigation.navigate('Home', {userUid: user.uid});
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
    <View>
      <Text >Todos</Text>
      <Text >Login to your account</Text>
      <TextInput
        placeholder="Enter your email*"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter your password*"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Pressable>
        <Button 
          title="Login"
          onPress={handlePress} />
      </Pressable>
      <Text>Not having account yet?</Text>
      <Pressable >
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')} />
      </Pressable>
      <Pressable >
        <Text 
          onPress={handlePressForgotPw}>Forgot password</Text>
      </Pressable>
      { showForgotPw &&
        <>
          <TextInput
            placeholder="Enter your email*"
            value={emailForgotPw}
            onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Pressable>
            <Button
              title="Reset password"
              onPress={() => handlePressResetPw()} />
          </Pressable>
          <Text>
            Be sure to check your spam folder after resetting!
          </Text>
        </>
      }
    </View>
  );
}