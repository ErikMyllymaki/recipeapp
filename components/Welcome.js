import { View, Text, Button } from 'react-native';
import Styles from '../style/style';


export default Welcome = ({ navigation }) => {



    return (
        <View style={Styles.container}>
            <Text>Welcome.js sivu</Text>
            <Button 
            title='Register'
            onPress={() => navigation.navigate('Register')}
            />
            <Button
            title='Login'
            onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}