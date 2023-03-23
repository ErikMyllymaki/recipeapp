import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#B5CFBB',
      flex: 1
    },
    header: {
        backgroundColor: '#ebece4',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    title: {
        color: '#4B702F',
        padding: 15,
        fontSize: 23
    },
    pageTitle: {
      fontSize: 20
    },
    categoryItem: {
      display: 'flex'
    },
    categoryTitle: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      flexDirection: 'column'
    },
    selectedCategoryTitle: {
      fontSize: 20
    },

    //about us sivulla käytetyt tyylit. Voi käyttää muillakin sivuilla
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

    },
    homeButton: {
      backgroundColor: 'green',
      paddingVertical: 10,
      width: 250,
      textAlign: 'center',
      fontSize: 18
    }
    
  });