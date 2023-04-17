import { View, Text, Pressable, ImageBackground, Dimensions } from 'react-native';
import Styles from '../style/style';


export default Welcome = ({ navigation }) => {

    const backgroundImage = require('../images/backgroundImage.jpg');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    return (
        <View style={[Styles.container, {flex: 1, justifyContent: 'center', alignItems:'center'}]}>
            <ImageBackground source={backgroundImage} style={{width: screenWidth, height: screenHeight, alignItems:'center', justifyContent: 'center', resizeMode: 'contain'}}>
            {/* <Text style={Styles.loginHeader}>Welcome to the RecipeHub!</Text> */}
            <Pressable 
            onPress={() => navigation.navigate('Register')} 
            style={{ paddingVertical: 30 }}
            ><Text style={Styles.homeButton}>Register</Text></Pressable>
            <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{ paddingVertical: 30 }}
            ><Text style={Styles.homeButton}>Login</Text></Pressable>
            <Pressable
            onPress={() => navigation.navigate('About')}
            style={{ paddingVertical: 30 }}
          >
            <Text style={Styles.homeButton}>About recipe app</Text>
          </Pressable>
            </ImageBackground>
        </View>
    )
}