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
        height: 130,
        paddingTop: 25
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
          shadowColor: '#717f6851',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        },
        android: {},
      }),
      
    },
    categoryTitle: {
      backgroundColor: 'white',
      padding: 20,
      width: 150,
      height: 150,
      ...Platform.select({
        ios: {
          height: 170,
          width: 170,
        },
        android: {}
      }),
      resizeMode: 'cover',
      alignItems: 'center',
      borderRadius: 15,
      overflow: 'hidden',
    },
    categoryName: {
      fontSize: 20,
      position: 'absolute', 
      bottom: 10
    },
    selectedCategoryTitle: {
      fontSize: 20
    },
    textInput: {
      padding: 10,
      margin: 15,
      borderRadius: 25,
      backgroundColor: '#ffffff',
    },

   //about us sivulla käytetyt tyylit. Voi käyttää muillakin sivuilla
   textAreaBackground: {
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    marginBottom: 50,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 100,
    marginHorizontal: 18,
    borderRadius: 20,
  },
  pageHeader: {
    fontSize: 25,
    fontFamily:'TenorSans',
    color: '#4B702F',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  contactUsHeader:{
    fontSize: 25,
    fontFamily: 'TenorSans',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    color: '#4B702F'
  },
  contactInformation:{
    fontSize: 19,
    fontFamily: 'GeosansLight',
    textAlign: 'center',
    paddingBottom: 5,
  },
  aboutUsIntroduction: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 25,
    padding: 15,
    fontFamily: 'GeosansLight'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 80,
  },
  icon: {
    marginHorizontal: 13,
    marginBottom: -10
  },
    homeButton: {
      fontFamily: 'TenorSans',
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
      expandedAddRecipeInput:{
          fontSize: 15,
          marginTop: 10,
          marginBottom: 10,
          marginHorizontal: 10,
          backgroundColor: 'white',
           padding: 10, 
          borderRadius: 15,
          backgroundColor: '#E8E8E8',
          height: 100,
          textAlignVertical: 'top',
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
      },
    recipeList: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 50,
      marginLeft: -100
    },
    searchInput: {
      backgroundColor: '#ffffff',
      height: 62,
      width: 333,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }
    
  });