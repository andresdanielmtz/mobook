import { auth, db } from "@/config/firebase";
import type { StoreUser } from "@/model/User";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// This function handles signing in with Google using Firebase Authentication.
// It checks if the user already exists in the Firestore database and creates a new user document if not.

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(), // Current date. :)
      });
    }
  } catch (error) {
    console.error(`Error signing in with Google: ${error}`);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date(),
    });
    return user;
  } catch (error) {
    console.error("Error registering with email: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(`Error signing out: ${error}.`);
    throw error;
  }
};

export const getUserById = async (
  userId: string,
): Promise<StoreUser | undefined> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as StoreUser;
    }
    return;
  } catch (error) {
    console.error(`Error getting user: ${error}`);
    return;
  }
};

export const updateBioByUserID = async (
  userId: string,
  newBio: string,
): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), {
      bio: newBio,
    });
  } catch (error) {
    console.error(`Error updating bio: ${error}`);
    return;
  }
};

export const getUserDisplayNames = async (userId: string): Promise<string> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return (userDoc.data() as StoreUser).displayName || "";
    }
    return "";
  } catch (error) {
    console.error("Error getting user displayName:", error);
    return "";
  }
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};
