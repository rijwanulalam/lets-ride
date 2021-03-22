import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import './Login.css'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

const Login = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
});
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    
    
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const loggedUser = { name: displayName, email };
        setLoggedInUser(loggedUser);
        history.push(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
      });
  };

  const handleFacebookSignIn = () => {
    
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ... 
      });
  };
  
const handleSubmit = (e) => {
    e.preventDefault();
     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
     .then((userCredential) => {
         const {displayName, email} = userCredential.user;
         const signedUser = {name:displayName, email}
         setLoggedInUser(signedUser);
         history.replace(from);
     });

}
  const handleBlur = (e) => {
    const newUser = {...user}
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
}
  return (
    <div>
      <h4>New User? Please Register Yourself For More Features.</h4>
      <br/>
      <Link to="/register"><Button variant="contained" color="primary">Register</Button></Link>
      <form onSubmit={handleSubmit}>
          <br/>
        <input className="login-field" type="email" name="email" placeholder="Enter Your Email" onBlur={handleBlur}/>
        <br/>
        <input className="login-field" type="password" name="password" placeholder="Enter a Strong Password" onBlur={handleBlur}/>
        <br/>
        <input className="login-button" type="submit"/>
        <br/>

      </form>
      <div className="log-button">
      <Button onClick={handleGoogleSignIn} variant="contained" color="primary">
        Google Login
      </Button> 
      </div>
      <br/>
      <div className="log-button">
      <Button className="log-button" onClick={handleFacebookSignIn} variant="contained" color="primary">
        Facebook Login
      </Button>
      </div>
    </div>
  );
};

export default Login;
