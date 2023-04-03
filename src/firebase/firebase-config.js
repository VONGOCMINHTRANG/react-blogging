// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAim9MW08vqKFB7tT_Ahk9smtRZe30WVhg',
  authDomain: 'react-blogging-87109.firebaseapp.com',
  projectId: 'react-blogging-87109',
  storageBucket: 'react-blogging-87109.appspot.com',
  messagingSenderId: '904552626831',
  appId: '1:904552626831:web:e4d4b3fcdf07adedc14efa',
  measurementId: 'G-RCNB2HBP9J',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
