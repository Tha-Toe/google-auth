import React from "react";
import { useEffect, useRef, useState } from "react";
import GoogleButton from "react-google-button";
import { useScript } from "../hook/useScript";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./signIn.css";

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

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com",
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: "medium",
    });
  });

  return (
    <div className="signInContainer">
      <div ref={googleButtonRef}></div>
      <button className="apple-button" onClick={handleAppleLogin}>
        Log in with apple
      </button>
    </div>
  );
}
