import { View, Text, Pressable } from 'react-native';
import Styles from '../style/style';


export default Welcome = ({ navigation }) => {



    return (
        <View style={[Styles.container, {flex: 1, justifyContent: 'center', alignItems:'center'}]}>
            <Text style={Styles.loginHeader}>Welcome to the RecipeHub!</Text>
            <Pressable 
            onPress={() => navigation.navigate('Register')} 
            style={{ paddingVertical: 30 }}
            ><Text style={Styles.homeButton}>Register</Text></Pressable>
            <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{ paddingVertical: 30 }}
            ><Text style={Styles.homeButton}>Login</Text></Pressable>
        </View>
    )
}