import { Alert } from "react-native";
import { ref, set } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword,
    signOut } from 'firebase/auth';
    import { auth, db, USERS_REF } from '../firebase/config';
import { async } from "@firebase/util";

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