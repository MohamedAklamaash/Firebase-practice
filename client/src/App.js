import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./Firebase";
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const App = () => {
  const signUpwithEmailAndPass = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        
      })
      .catch(() => {
        console.log("Not signed In");
      });
      setemail("");
      setpassword("");
  };
  const signIn = ()=>{
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      console.log("Sign in successful");
    }).catch(()=>{
      alert("User not Found");
    })
  }
  const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider).then((res)=>{
      const credentials = GoogleAuthProvider.credentialFromResult(res);
      const token = credentials.accessToken;
      const user = res.user;
      console.log(user);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const putData = () => {
    const userRef = ref(db, "users/Aklamaash");
    const userData = {
      name: "Aklamaash",
      age: 19,
    };

    set(userRef, userData)
      .then(() => {
        console.log("Data set successfully");
      })
      .catch((error) => {
        console.error("Error setting data:", error);
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      App
      <button onClick={putData}>PutData</button>
      <h1>SignUp Page</h1>
      <input
        type="text"
        placeholder="Enter Email"
        onChange={(ev) => setemail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(ev) => setpassword(ev.target.value)}
      />
      <button onClick={signUpwithEmailAndPass}>SignUp</button>
      <h1>SignIn Page</h1>
      <input
        type="text"
        placeholder="Enter Email"
        onChange={(ev) => setemail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(ev) => setpassword(ev.target.value)}
      />
      <button onClick={signIn}>SignIn</button>
      <br/>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button>Signup with Google</button>
    </div>
  );
};

export default App;
