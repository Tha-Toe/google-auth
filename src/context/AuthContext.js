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
const CLIENT_ID =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/calendar";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [idToken, setIdToken] = useState(null);
  const [loginByGoogle, setLoginByGoogle] = useState(false);
  const [jwt, setJwt] = useState(null);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      setIdToken(token);
    }
  });
  const appleSignIn = async () => {
    setLoginByGoogle(false);

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
  const getTokenFunc = () => {
    let tokenClientLet = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      prompt: "",
      callback: (res) => {
        console.log(res);
        // setAccessToken(res.access_token);
      },
    });
    tokenClientLet.requestAccessToken();
  };
  const onGoogleSignIn = (user) => {
    console.log(user);
    setIdToken(null);
    let userCred = user.credential;
    setJwt(userCred);
    let payload = jwt_decode(userCred);
    setUser(payload);
    setLoginByGoogle(true);
    getTokenFunc();
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        appleSignIn,
        idToken,
        onGoogleSignIn,
        loginByGoogle,
        jwt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
