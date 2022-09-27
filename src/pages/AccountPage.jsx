import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
const CLIENT_ID =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/calendar";
export default function AccountPage() {
  const { logOut, user, idToken, loginBy, jwt } = UserAuth();
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const getTokenFunc = () => {
    let tokenClientLet = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: (res) => {
        console.log(res);
        setAccessToken(res.access_token);
      },
    });
    tokenClientLet.requestAccessToken();
  };
  const [accessToken, setAccessToken] = useState(null);
  if (loginBy === "google") {
    return (
      <div>
        <h1>Account</h1>
        <div>
          <span>Welcome,</span>
          <span>{user?.displayName}</span>
        </div>
        <div>{user?.email}</div>
        <button onClick={getTokenFunc}>Add to calaner</button>
        <br />
        {jwt && <div style={{ maxWidth: "100vw" }}>JWT Token - {jwt}</div>}
        <br />
        {accessToken && (
          <div style={{ maxWidth: "100vw" }}>Access Token - {accessToken}</div>
        )}
        <button onClick={handleSignOut}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Account</h1>
        <div>
          <span>Welcome,</span>
          <span>{user?.displayName}</span>
        </div>
        <div>{user?.email}</div>
        <div>{idToken && idToken}</div>
        <br />
        <button onClick={handleSignOut}>Logout</button>
      </div>
    );
  }
}
