import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable, ScrollView } from 'react-native';
import { signUp } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import styles from '../style/style';
import { AntDesign } from '@expo/vector-icons';

export default Register = ({ navigation }) => {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePress = () => {
    if (!nickname) {
      Alert.alert('Nickname is required');
    }
    else if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      signUp(nickname, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Home', { userUid: user.uid });
        }
      });
    }
  };

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
      <View
        style={styles.container}
      //contentContainerStyle={styles.contentContainerStyle}
      >
        {/* <Text style={styles.header}>Todos</Text> */}
        <Text style={styles.infoText}>Create an account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nickname*"
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname.trim())}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
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
        <TextInput
          style={styles.textInput}
          placeholder="Confirm password*"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
        <Pressable onPress={handlePress} style={{ paddingVertical: 30, alignItems: 'center' }}>
          <Text style={styles.buttonStyle}>Register</Text>
        </Pressable>
        <Text style={styles.infoText}>Already have an account?</Text>
        <Pressable style={{ paddingVertical: 30, alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonStyle}>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}