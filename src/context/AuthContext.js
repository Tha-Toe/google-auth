import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [idToken, setIdToken] = useState(null);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      setIdToken(token);
    }
  });
  const appleSignIn = async () => {
    const appleProvider = new OAuthProvider("apple.com");
    console.log("here");
    await signInWithPopup(auth, appleProvider);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, appleSignIn, idToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
