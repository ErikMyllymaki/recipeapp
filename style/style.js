import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#cfe2c5',
    flex: 1,
  },
  header: {
    backgroundColor: '#fcffec',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    paddingTop: 25
  },
  scrollView: {
    backgroundColor: '#cfe2c5'
  },
  userNicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loggedInAsText: {
    color: '#13270593',
    fontStyle: 'italic'
  },
  userNickname: {
    color: '#183007ff',
    fontStyle: 'italic'
  },
  // loginHeader: {
  //     fontSize: 25,
  //     fontFamily: 'TenorSans',
  //     textAlign: 'center',
  //     marginTop: -100,
  //     marginLeft: 100,
  //     marginBottom: 60,
  //     marginRight: 100
  // },
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
        shadowColor: '#2c3126',
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

    shadowColor: '#2c3126',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryName: {
    fontSize: 18,
    position: 'absolute',
    bottom: 10,
    color: '#3e532d',
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
    backgroundColor: '#fefff6',
    marginBottom: 50,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 100,
    marginHorizontal: 18,
    borderRadius: 20,
  },
  pageHeader: {
    fontSize: 25,
    fontFamily: 'TenorSans',
    color: '#4B702F',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: -50
  },
  madeByText: {
    fontSize: 15,
    fontFamily: 'TenorSans',
    color: '#4B702F',
    textAlign: 'center',
    paddingTop: 15
  },
  recipeIcons: {
    paddingTop: 25
  },
  contactUsHeader: {
    fontSize: 25,
    fontFamily: 'TenorSans',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    color: '#4B702F'
  },
  addRecipeLabel: {
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 5
  },
  dropdown: { 
    backgroundColor: '#61876170',
    borderRadius: 15,
    color: '#ffffff'
  },
  addRecipeTextInput: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff'
  },
  addButton: {
    fontFamily: 'TenorSans',
    backgroundColor: '#618761e9',
    height: 50,
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 50
      },
      android: {}
    }),
    borderRadius: 15,
    color: '#ffffff',
    overflow: 'hidden'
  },
  addImageButton: {
    fontFamily: 'TenorSans',
    backgroundColor: '#618761e9',
    width: 150,
    height: 40,
    textAlign: 'center',
    fontSize: 14,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 50
      },
      android: {}
    }),
    borderRadius: 15,
    color: '#ffffff',
    overflow: 'hidden',
  },
  rememberText: {
    alignSelf: 'center',
    margin: 10,
    fontStyle: 'italic',
  },
  unitDropdown: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 2
  },
  contactInformation: {
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
  buttonStyle: {
    fontFamily: 'TenorSans',
    backgroundColor: '#618761e9',
    width: 200,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 50
      },
      android: {}
    }),
    borderRadius: 15,
    color: '#ffffff',
    overflow: 'hidden'
  },
  infoText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    padding: 20
  },
  homeButton: {
    fontFamily: 'TenorSans',
    backgroundColor: '#618761e9',
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
    color: '#fefff6',
    overflow: 'hidden'
  },
  addRecipeInput: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#E8E8E8',
  },
  expandedAddRecipeInput: {
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
  addRecipeButton: {
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
    backgroundColor: '#fbfcf5',
    height: 62,
    width: 333,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    shadowColor: '#2c3126',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeBackground: {
    backgroundColor: '#fbfcf5',
    paddingBottom: 30,
    marginTop: 30, 
    marginBottom: 70,
    marginHorizontal: 18,
    borderRadius: 20,
  },
  recipeImageView: {
    alignItems: 'center',
    shadowColor: '#2c3126',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20
  },
  recipeImage: {
    height: 290,
    width: '100%',
    borderRadius: 20,
  },
  recipeInfo: {
    paddingHorizontal: 26,
    borderRadius: 20,
  },
  recipeSubtitle: {
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 5,
  },
  navigateBack: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 15
  },
  navigateBackHeader: {
    fontSize: 19,
    fontFamily: 'TenorSans',
    color: '#4B702F',
    paddingTop: 4,
    paddingLeft: 8,
  },
  recipeListItem: {
    backgroundColor: '#fbfcf5',
    width: 333,
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#2c3126',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeListImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 30,
  },
  recipeListName: {
    fontSize: 15,
  },
  ingredient: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginHorizontal: 40,
    marginVertical: 1,
    backgroundColor: '#61876e52',
    borderRadius: 15
  },
  SaveRecipeButton: {
    fontFamily: 'TenorSans',
    backgroundColor: '#618761e9',
    width: 200,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 50
      },
      android: {}
    }),
    borderRadius: 15,
    color: '#ffffff',
    overflow: 'hidden',
  },
});
