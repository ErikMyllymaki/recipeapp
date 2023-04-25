
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {initializeAuth,
        getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";


        
        const firebaseConfig = ({
          apiKey: "AIzaSyAmFDeoXor69uO0mW7fH_TMlYFIxUOmEOc",
          authDomain: "recipehub-bf167.firebaseapp.com",
          databaseURL: "https://recipehub-bf167-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "recipehub-bf167",
          storageBucket: "recipehub-bf167.appspot.com",
          messagingSenderId: "368370326056",
          appId: "1:368370326056:web:ad097a0428557a584d331d"
        });
        
        
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage)
        });
        export { auth };

        export const db = getDatabase(app);


        export const RECIPES_REF = 'recipes/';
        export const USERS_REF = '/users/';
        export const FAVORITES_REF = '/favorites/';
        export const storage = getStorage(app);