import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyATN4IDqPQlNrFLhLWfYcwiWwCU9rHSqOc",
  authDomain: "reactcourse-38336.firebaseapp.com",
  databaseURL: "https://reactcourse-38336.firebaseio.com",
  projectId: "reactcourse-38336",
  storageBucket: "reactcourse-38336.appspot.com",
  messagingSenderId: "249289601298",
  appId: "1:249289601298:web:63a3d80de95f69517503cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  console.error("Firebase persistence error:", err);
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled in one tab
    console.warn("Multiple tabs open, persistence enabled in only one tab");
  } else if (err.code === "unimplemented") {
    // The current browser does not support persistence
    console.warn("The current browser does not support persistence");
  }
});

// Check if we're in development mode with localhost
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  try {
    const { connectFirestoreEmulator } = require("firebase/firestore");
    const { connectAuthEmulator } = require("firebase/auth");

    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    console.log("Connected to Firebase emulators");
  } catch (e) {
    console.error("Failed to connect to Firebase emulators:", e);
  }
}

export { app, db, auth };
