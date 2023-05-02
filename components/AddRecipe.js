import React, { useState, useEffect } from 'react'
import { Image, View, Text, TextInput, Button, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, RECIPES_REF, USERS_REF } from '../firebase/config';
import { auth } from '../firebase/config';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import NumericInput from 'react-native-numeric-input'
import { getStorage, uploadBytesResumable, getDownloadURL, ref as storageref } from "firebase/storage";
import { storage } from '../firebase/config.js';



const CATEGORIES_TITLES = [
  'Breakfast',
  'Dinner',
  'Drinks',
  'Dessert',
  'Snacks',
  'Pastries'
];

export default function AddRecipe() {

  const [userKey, setUserKey] = useState('');
  const [nickname, setNickname] = useState('');

  const [category, setCategory] = useState('Breakfast');
  const [recipeName, setRecipeName] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [servingSize, setServingSize] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [imgUploadCheck, setImgUploadCheck] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);


  const addNewRecipe = () => {
    if (recipeName.trim() !== "" && ingredients.length > 0 && instructions.trim() !== "") {
      const newRecipeItem = {
        recipeName: recipeName,
        servingSize: servingSize,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
        userKey: userKey,
        nickname: nickname,
        image: image,
        imageURL: imageURL,
      };

      const newRecipeItemRef = push(ref(db, RECIPES_REF), newRecipeItem);
      const newRecipeItemKey = newRecipeItemRef.key;
      setRecipeName('');
      setIngredients([]);
      setInstructions('');
      setCategory('Breakfast');
      setServingSize(0);
      setImage(null);
      setImgUploadCheck(false);
      this.recipeName.clear();
      this.textInput.clear();
      this.instructions.clear();
      return newRecipeItemKey;
    } else if (recipeName.trim() == "") {
      Alert.alert("Please give a name to your recipe.");
      return;
    }
    else if (ingredients.length <= 0) {
      Alert.alert("Please add ingredients to your recipe.");
      return;
    } else if (instructions.trim() == "") {
      Alert.alert("Please add instructions to your recipe.");
      return;
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(db, USERS_REF + '/' + user.uid);
        onValue(userRef, snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setUserKey(user.uid);
            setNickname(userData.nickname);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const recipesRef = ref(db, RECIPES_REF);
    onValue(recipesRef, (snapshot) => {
      const recipesObject = snapshot.val();
      if (recipesObject) {
        const recipesList = Object.entries(recipesObject).map(([key, value]) => ({
          key,
          ...value,
        }));
        setRecipes(recipesList);
      } else {
        setRecipes([]);
      }
    });
  }, []);

  const addIngredient = () => {

    const newIngredient = ingredientAmount + ' ' + unit + ' ' + ingredient;

    if (ingredient == '') {
      alert('Ingredient required!');
    } else if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setIngredientAmount('');
      setUnit('');
      setIngredient('');
    }
  }

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri }
    console.log(source)
    setImage(source)
  };

  const uploadImage = async () => {
    setUploading(true);
    if (image) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      const storageRef = storageref(storage, 'images/' + filename);
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          const downloadURL = await getDownloadURL(storageRef);
          console.log('File available at', downloadURL);
          setImage(downloadURL);
          setUploading(false);
          setImgUploadCheck(true);
        }
      );
    }
  }


  const handleRemoveIngredient = (ingredient) => {
    const newIngredients = ingredients.filter((item) => item !== ingredient);
    setIngredients(newIngredients);
  };



  return (
    <ScrollView style={Styles.scrollView}>
      <View style={[Styles.container, {paddingBottom: 65}]}>
        <Text style={Styles.pageHeader}>ADD RECIPE</Text>

        <View style={{marginHorizontal: 8}}>
        <Text style={Styles.addRecipeLabel}>Choose category</Text>
        <View style={Styles.dropdown}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)} itemStyle={{ height: 45 }}
          >
            {CATEGORIES_TITLES.map((category) => (
              <Picker.Item
                key={category}
                label={category}
                value={category}
              />
            ))}
          </Picker>
        </View>

        <Text style={Styles.addRecipeLabel}>Recipe name</Text>

        <TextInput
          ref={input => { this.recipeName = input }}
          placeholder='Name'
          style={Styles.addRecipeTextInput}
          onChangeText={setRecipeName}
        />

        <Text style={Styles.addRecipeLabel}>Amount of portions:</Text>

        <TextInput
          value={servingSize}
          style={Styles.addRecipeTextInput}
          type="text"
          keyboardType='number-pad'
          placeholder='0'
          onChangeText={(text) => setServingSize(text)}
        />

        {/* <NumericInput
          value={servingSize}
          onChange={setServingSize}
          rounded
        /> */}

        <Text style={Styles.addRecipeLabel}>Add ingredients</Text>

        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          {/* <NumericInput
            value={ingredientAmount}
            onChange={setIngredientAmount}
            rounded
          /> */}
          <TextInput
            value={ingredientAmount}
            style={[Styles.addRecipeTextInput, { flex: 0.5, height: 50 }]}
            type="text"
            keyboardType='number-pad'
            placeholder='0'
            onChangeText={(text) => setIngredientAmount(text)}
          />

          <View style={[Styles.unitDropdown, {flex: 2.5}]}>
            <Picker
              selectedValue={unit}
              type="text"
              onValueChange={(value) => setUnit(value)} itemStyle={{ height: 50 }}
              style={{fontSize: 10}}
              >
              <Picker.Item style={{fontSize: 14}} label='Unit' value="" />
              <Picker.Item style={{fontSize: 14}} label='ml' value="ml" />
              <Picker.Item style={{fontSize: 14}} label='dl' value="dl" />
              <Picker.Item style={{fontSize: 14}} label='l' value="l" />
              <Picker.Item style={{fontSize: 14}} label='tsp' value="tsp" />
              <Picker.Item style={{fontSize: 14}} label='tblsp' value="tblsp" />
              <Picker.Item style={{fontSize: 14}} label='g' value="g" />
              <Picker.Item style={{fontSize: 14}} label='kg' value="kg" />
              <Picker.Item style={{fontSize: 14}} label='pcs' value="pcs" />
              <Picker.Item style={{fontSize: 14}} label='cup' value="cup" />
              <Picker.Item style={{fontSize: 14}} label='cups' value="cups" />
              <Picker.Item style={{fontSize: 14}} label='pound' value="pound" />
            </Picker>
          </View>

          <TextInput
            value={ingredient}
            type="text"
            ref={input => { this.textInput = input }}
            style={[Styles.addRecipeTextInput, { flex: 3 }]}
            placeholder='Ingredient'
            onChangeText={(text) => setIngredient(text)}
          />

          <Pressable
            style={{ alignItems: 'center', flex: 1.5 }}
            onPress={() => {
              addIngredient();
            }} >
            <Text style={Styles.addButton}>Add</Text>
          </Pressable>
        </View>
        
        
        {ingredients.map((ingredient, index) => (
          <View key={index} style={Styles.ingredient}>
            <Text style={{ fontSize: 16 }}>{ingredient}</Text>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => handleRemoveIngredient(ingredient)}
            >
              <EvilIcons name="trash" size={30} />
            </Pressable>
          </View>
        ))}

        <Text style={Styles.addRecipeLabel}>Add instructions</Text>

        <TextInput
          ref={input => { this.instructions = input }}
          multiline={true}
          style={Styles.addRecipeTextInput}
          placeholder='Instructions'
          onChangeText={text => setInstructions(text)} 
        />

        <Pressable onPress={pickImage} style={{ alignItems: 'center', marginTop: 20, marginBottom: 6 }}>
          <Text style={Styles.addImageButton}>Pick an image</Text>
        </Pressable>

        {image != null ? (
          <>
        <View>
          {image && <Image source={{ uri: image.uri }} style={{ width: 280, height: 200, alignSelf: 'center', borderRadius: 8 }} /> }
        </View>
        <Text style={Styles.rememberText}>Remember to upload image before saving recipe!</Text>
        <Pressable onPress={uploadImage} style={{ alignItems: 'center', marginTop: 6, marginBottom: 20 }}>
          <Text style={Styles.addImageButton}>Upload image</Text>
        </Pressable>
        </>
        ) : (
          <></>
        )}

        {uploading == true &&
          <View>
            <Text style={Styles.rememberText}>Uploading image...</Text>
          </View>
        }

        {imgUploadCheck == true ? (
          <View>
            <Text style={Styles.rememberText}>Image uploaded succesfully!</Text>
          </View>
        ) : (
          <></>
        )}

        <Pressable
          style={{ alignItems: 'center' }}
          onPress={() => {
            addNewRecipe();
          }}
        >
          <Text style={Styles.buttonStyle}>Save recipe</Text>
        </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
