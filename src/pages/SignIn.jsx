import React from "react";
import { useEffect } from "react";
import GoogleButton from "react-google-button";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./signIn.css";

export default function SignIn() {
  const { googleSignIn, user, appleSignIn } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAppleLogin = async () => {
    try {
      await appleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user !== null) {
      navigate("/account", { replace: true });
    }
  }, [user]);
  return (
    <div className="signInContainer">
      <GoogleButton onClick={handleGoogleSignIn} />
      <button className="apple-button" onClick={handleAppleLogin}>
        Log in with apple
      </button>
    </div>
  );
}
