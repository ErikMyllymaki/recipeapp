import { Alert } from "react-native";
import { ref, set } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword,
    signOut, 
    signInWithEmailAndPassword} from 'firebase/auth';
    import { auth, db, USERS_REF } from '../firebase/config';

export const signUp = async (nickname, email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                set(ref(db, USERS_REF + userCredential.user.uid), {
                    nickname: nickname,
                    email: userCredential.user.email
                });
            })
        }
        catch (error) {
            console.log("Registration failed. ", error.message);
            Alert.alert("Registration failed. ", error.message);
        }
        
}


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
