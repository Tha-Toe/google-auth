import React from "react";
import { useEffect, useRef, useState } from "react";
import GoogleButton from "react-google-button";
import { useScript } from "../hook/useScript";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./signIn.css";

const CLIENT_ID =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/calendar";

export default function SignIn() {
  const { user, appleSignIn, onGoogleSignIn } = UserAuth();
  const navigate = useNavigate();

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

  const googleButtonRef = useRef(null);
  const [tokenClient, setTokenClient] = useState(null);

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: onGoogleSignIn,
      auto_select: false,
    });
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: "medium",
    });
  });

  return (
    <div className="signInContainer">
      <div className="google-container">
        <div ref={googleButtonRef} style={{ opacity: "0", zIndex: "10" }}></div>
        <div className="google-button">Log in with google</div>
      </div>
      <button className="apple-button" onClick={handleAppleLogin}>
        Log in with apple
      </button>
    </div>
  );
}
