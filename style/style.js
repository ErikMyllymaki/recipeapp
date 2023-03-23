import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#B5CFBB',
      flex: 1,
      
    },
    testi: {
      flex: 1,
      flexDirection: 'column'
    },
    header: {
        backgroundColor: '#eaece5',
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
    bottom: 10,
    width: '100%',
    height: 60,
    
  },
  icon: {
    marginHorizontal: 10,
    marginBottom: -10
  },
    homeButton: {
      backgroundColor: '#61876ee9',
      width: 300,
      height: 100,
      textAlign: 'center',
      fontSize: 18,
      textAlignVertical: 'center',
      borderRadius: 15,
      color: '#ffffff'
    }
    
  });