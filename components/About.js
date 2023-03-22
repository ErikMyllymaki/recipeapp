import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../style/style';

export default function App() {
  return (
    <View style={Styles.background}>
    <Text style={Styles.pageHeader}>ABOUT US</Text>
    <View style={Styles.textAreaBackground}>
    <Text>Welcome to our recipe app! We're a team of food lovers and tech experts who are passionate about making cooking and meal planning easy and enjoyable. Our app features a wide range of recipes for all dietary needs and preferences. Thanks for choosing us as your go-to recipe app!</Text>
    <Text>Contact us</Text>
    <Text>Yliopistokatu 9</Text>
    <Text>020 6110212</Text>
    <Text>recipehub@recipehub.com</Text>
    </View>
    </View>
  );
}

