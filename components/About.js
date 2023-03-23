import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Linking } from 'react-native';
import Styles from '../style/style';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function App() {

  const handlePressTiktok = () => {
    Linking.openURL('https://www.tiktok.com/');
  };

  const handlePressInsta = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const handlePressFacebook = () => {
    Linking.openURL('https://www.Facebook.com/');
  };

  const TikTokIcon = () => {
    return (
      <TouchableOpacity onPress={handlePressTiktok} >
        <FontAwesome5 name="tiktok" size={60} color="#000000" style={Styles.icon} />
      </TouchableOpacity>
    );
  };

  const InstagramIcon = () => {
    return (
      <TouchableOpacity onPress={handlePressInsta}>
        <Ionicons name="logo-instagram" size={60} color="#C13584" style={Styles.icon} />
      </TouchableOpacity>
    );
  };

  const FacebookIcon = () => {
    return (
      <TouchableOpacity onPress={handlePressFacebook}>
        <FontAwesome name="facebook-square" size={60} color="#4267B2" style={Styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.background}>
      <Text style={Styles.pageHeader}>ABOUT US</Text>
      <View style={Styles.textAreaBackground}>
        <Text style={Styles.aboutUsIntroduction}>Welcome to our recipe app! We're a team of food lovers and tech experts who are passionate about making cooking and meal planning easy and enjoyable. Our app features a wide range of recipes for all dietary needs and preferences. Thanks for choosing us as your recipe app!</Text>
        <Text style={Styles.contactUsHeader}>Contact us</Text>
        <Text style={Styles.contactInformation}>Yliopistokatu 9</Text>
        <Text style={Styles.contactInformation}>020 6110232</Text>
        <Text style={Styles.contactInformation}>recipehub@recipehub.com</Text>

        <View style={Styles.socialIcons}>
          <TikTokIcon />
          <InstagramIcon />
          <FacebookIcon/>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}
