import { Alert } from "react-native";
import { ref, set } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword,
    signOut, 
    signInWithEmailAndPassword} from 'firebase/auth';
    import { auth, db, USERS_REF } from '../firebase/config';


export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
        console.log("Login failed. ", error.message);
        Alert.alert("Login failed. ", error.message);
    };
}

export const logout = async () => {
    try {
        await signOut(auth);
    }
    catch(error) {
        console.log("Logout error. ", error.message);
        Alert.alert("Logout error. ", error.message);
    };
}