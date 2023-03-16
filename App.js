import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Styles from './style/style';

export default function App() {
  return (
    <View style={Styles.container}>
      <Header />
      <Text>Open up App.jss to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

