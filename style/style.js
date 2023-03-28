import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#B5CFBB',
      flex: 1,
      
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
      fontSize: 30,
      margin: 20,
    },
    categoryItem: {
      flex: 1,
      padding: 10,
      ...Platform.select({
        ios: {
          alignItems: "center",
        },
        android: {},
      }),
    },
    categoryTitle: {
      backgroundColor: 'white',
      padding: 20,
      width: 160,
      height: 160,
      resizeMode: 'cover',
      alignItems: 'center',
      borderRadius: 15,
      overflow: 'hidden'
    },
    categoryName: {
      fontSize: 20
    },
    selectedCategoryTitle: {
      fontSize: 20
    },
    textInput: {
      borderWidth: 1,
      padding: 5,
      margin: 5,
      backgroundColor: 'yellow'
    },

   //about us sivulla käytetyt tyylit. Voi käyttää muillakin sivuilla
   textAreaBackground: {
    alignItems: 'center',
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
      ...Platform.select({
        ios: {
          lineHeight: 100
        },
        android: {}
      }),
      borderRadius: 15,
      color: '#ffffff',
      overflow: 'hidden'
    },
    addRecipeInput:{
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 30,
      backgroundColor: 'white',
       padding: 10, 
      borderRadius: 15,
      backgroundColor: '#E8E8E8',
      },
      addRecipeButton:{
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 60,
        borderRadius: 15,
      },
      addRecipeButtonText: {
        color: '#40793F',
        fontSize: 24,
      }

    
    
  });