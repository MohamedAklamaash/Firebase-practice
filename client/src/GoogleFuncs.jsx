import React, { useState } from "react";
import {
  signInWithRedirect,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult
} from "firebase/auth";
import { app } from "./Firebase";
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const GoogleFuncs = () => {
  const signinWithRedirect = () => {
    signInWithRedirect(auth,provider).then((res)=>{
        const credentials = GoogleAuthProvider.credentialFromResult(res);
        const token = credentials.accessToken;
        const user = res.user;
        console.log(user);
    })
    getRedirectResult(auth).then((res)=>{
        const credentials = GoogleAuthProvider.credentialFromResult(res);
        const token = credentials.accessToken;
        const user = res.user;
        console.log(user);
    })
  };
  return (
    <div>
      <div>
        <button onClick={signinWithRedirect}>Sign in with redirect</button>
      </div>
    </div>
  );
};

export default GoogleFuncs;
