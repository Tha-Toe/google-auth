import React from "react";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { logOut, user, idToken } = UserAuth();
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
  return (
    <div>
      <h1>Account</h1>
      <div>
        <span>Welcome,</span>
        <span>{user?.displayName}</span>
      </div>
      <div>{user?.email}</div>
      <div>{idToken && idToken}</div>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
