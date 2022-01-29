import logo from './logo.svg';
import './App.css';
import { Bubbles } from './Bubbles.js';
import {app} from './firebase.js';
import { 
  getAuth, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  getRedirectResult 
} from "firebase/auth";

import { 
getFirestore,
doc, 
onSnapshot
} from "firebase/firestore";

import {useEffect} from 'react';
import { Outlet, Link } from "react-router-dom";





 async function signIn() {
   // Sign in Firebase using popup auth and Google as the identity provider.
   var provider = new GoogleAuthProvider();
   await signInWithRedirect(getAuth(), provider);

   if (result) {
      // This is the signed-in user
      const user = result.user;
      // console.log(user);
    }
 }


async function result(){
   const result = await getRedirectResult(getAuth());
   // console.log(result.user);
};



function App() {



  return (
    

    <div className="App">
      <div className="viz">

          <Bubbles/>

      </div>
    </div>

  );
}

export default App;
