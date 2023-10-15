import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set ,get,child,onValue } from "firebase/database";
import { app } from "./Firebase";
import GoogleFuncs from "./GoogleFuncs";
import FireStore from "./FireStore";
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
  const getData = ()=>{
    const data = get(child(ref(db),"users")).then((d)=>{
      console.log(d.val());
    })
    onValue(ref(db,"users"),(snapshot)=>{
      console.log(snapshot.val());
    })
  } 
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user);
      }else{
        console.log("User not logged in")
      }
    })
  },[])

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
      <button onClick={getData}>Get Data</button>
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
      <button onClick={()=>signOut(auth)}>Logout</button>
      <GoogleFuncs/>
      <FireStore/>
    </div>
  );
};

export default App;
