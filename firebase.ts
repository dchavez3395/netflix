// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwIaIv9pyiB-5yExC8Wf5IXqwWkkBCRnM",
    authDomain: "netflix-da8a3.firebaseapp.com",
    projectId: "netflix-da8a3",
    storageBucket: "netflix-da8a3.appspot.com",
    messagingSenderId: "585515746260",
    appId: "1:585515746260:web:c81521ae78e53eae70cc41"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }