import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#B5CFBB',
      flex: 1
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
    textAreaBackground: {
      backgroundColor: '#E8E8E8',
      marginBottom: 15,
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 15,
      paddingBottom: 80,
      marginHorizontal: 18,
      borderRadius: 20,
    },
    pageHeader: {
      fontSize: 30,
      color: '#4B702F',
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15,
    },
    contactUsHeader:{
      fontSize: 30,
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 5,
    },
    contactInformation:{
      fontSize: 20,
      textAlign: 'center',
      paddingBottom: 5,
    },
    aboutUsIntroduction: {
      fontSize: 20,
      textAlign: 'center',
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 60,
    },
    icon: {
      marginHorizontal: 10,
    },
    
  });