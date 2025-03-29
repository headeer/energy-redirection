import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATN4IDqPQlNrFLhLWfYcwiWwCU9rHSqOc",
  authDomain: "reactcourse-38336.firebaseapp.com",
  databaseURL: "https://reactcourse-38336.firebaseio.com",
  projectId: "reactcourse-38336",
  storageBucket: "reactcourse-38336.firebasestorage.app",
  messagingSenderId: "249289601298",
  appId: "1:249289601298:web:63a3d80de95f69517503cb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure auth persistence
auth.useDeviceLanguage();

// Export default app
export default app;
