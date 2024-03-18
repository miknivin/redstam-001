// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDedbiYtlukn6rSVvgmMG4XcEB4K88bqEk",
  authDomain: "ecom-phone-auth-e7414.firebaseapp.com",
  projectId: "ecom-phone-auth-e7414",
  storageBucket: "ecom-phone-auth-e7414.appspot.com",
  messagingSenderId: "43404915083",
  appId: "1:43404915083:web:c5e5874d0f630f3a4aff8e",
  measurementId: "G-V6RVP9GJSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
