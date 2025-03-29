import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./config";
import { User, UserProfile } from "../types/types";
import { v4 as uuidv4 } from "uuid";

// Convert Firebase User to our User type
export const formatUser = (user: FirebaseUser): User => {
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    emailVerified: user.emailVerified,
  };
};

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile if displayName is provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Send verification email
    await sendEmailVerification(user);

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: displayName || "",
      selectedCategories: [],
      personalSuggestions: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      totalRedirections: 0,
      totalImpulses: 0,
      rewardSettings: {
        small: {
          title: "Mała nagroda",
          description: "Krótka przerwa na kawę lub herbatę",
          threshold: 5,
        },
        medium: {
          title: "Średnia nagroda",
          description: "Obejrzyj odcinek ulubionego serialu",
          threshold: 15,
        },
        large: {
          title: "Duża nagroda",
          description: "Wyjście do kina lub restauracji",
          threshold: 30,
        },
      },
      onboardingCompleted: false,
    };

    await setDoc(doc(db, "users", user.uid), userProfile);

    return formatUser(user);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Sign in an existing user
export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update last login
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      lastLogin: new Date().toISOString(),
    });

    return formatUser(user);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign out the current user
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Request password reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Fetch user profile
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log("No user profile found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Add a personal suggestion
export const addPersonalSuggestion = async (
  uid: string,
  category: string,
  action: string,
  isPreset = false
): Promise<string> => {
  try {
    const suggestionId = uuidv4();
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as UserProfile;
      const suggestions = userData.personalSuggestions || [];

      const newSuggestion = {
        id: suggestionId,
        category,
        action,
        isPreset,
      };

      await updateDoc(userRef, {
        personalSuggestions: [...suggestions, newSuggestion],
      });

      return suggestionId;
    } else {
      throw new Error("User profile not found");
    }
  } catch (error) {
    console.error("Error adding personal suggestion:", error);
    throw error;
  }
};

// Create a Google provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Check if user profile exists
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Create new user profile
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        selectedCategories: [],
        personalSuggestions: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        totalRedirections: 0,
        totalImpulses: 0,
        rewardSettings: {
          small: {
            title: "Mała nagroda",
            description: "Krótka przerwa na kawę lub herbatę",
            threshold: 5,
          },
          medium: {
            title: "Średnia nagroda",
            description: "Obejrzyj odcinek ulubionego serialu",
            threshold: 15,
          },
          large: {
            title: "Duża nagroda",
            description: "Wyjście do kina lub restauracji",
            threshold: 30,
          },
        },
        onboardingCompleted: false,
      };

      await setDoc(userRef, userProfile);
    } else {
      // Update last login
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
      });
    }

    return formatUser(user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
