import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    header: {
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    title: {
        color: '#4B702F',
        padding: 15,
        fontSize: 23
    },

    //about us sivulla käytetyt tyylit. Voi käyttää muillakin sivuilla
    background: {
      backgroundColor: '#B5CFBB',
      flex: 1
    },
    textAreaBackground: {
      backgroundColor: '#E8E8E8',
      marginBottom: 15,
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 15,
      
    },
    pageHeader: {
      fontSize: 30,
      color: '#4B702F',
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15,
    },
    aboutUsIntroduction: {

    }
    
  });