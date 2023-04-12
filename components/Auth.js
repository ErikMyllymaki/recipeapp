import { Alert } from "react-native";
import { ref, set } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword,
    signOut } from 'firebase/auth';
    import { auth, db, USERS_REF } from '../firebase/config';