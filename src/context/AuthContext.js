import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
} from "firebase/auth";
import { auth } from "../firebase";
import jwt_decode from "jwt-decode";

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

  const logOut = () => {
    signOut(auth);
    setUser(null);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onGoogleSignIn = (user) => {
    setIdToken(null);
    let userCred = user.credential;
    let payload = jwt_decode(userCred);
    setUser(payload);
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        appleSignIn,
        idToken,
        onGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
