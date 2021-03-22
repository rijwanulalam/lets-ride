import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import './Register.css'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from : { pathname: '/'}};
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            history.replace('/login')
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
    }

    const handleBlur = (e) => {
        const newUser = {...user}
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    return (
    <div>
      <h4>already have an account?</h4>
      <a href="/login"><Button variant="contained" color="primary">Login</Button></a>
      <form onSubmit={handleSubmit}>
      <input className= "login-field" type="name" name="name" placeholder="Enter Your Name" onBlur={handleBlur}/>
      <br/>
        <input className= "login-field" type="email" name="email" placeholder="Enter Your Email" onBlur={handleBlur}/>
        <br/>
        <input className= "login-field" type="password" name="password" placeholder="Enter Your Password" onBlur={handleBlur}/>
        <br/>
        <input className= "login-button" type="submit"/>
      </form>
    </div>
    );
};

export default Register;