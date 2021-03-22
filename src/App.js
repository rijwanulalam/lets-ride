import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';


export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header></Header>
      <Switch>
      <Route exact path="/">
            <Home></Home>
        </Route>
        <Route path="/home">
            <Home></Home>
        </Route>
        <Route path="/login">
            <Login></Login>
        </Route>
        <Router path="/register">
          <Register></Register>
        </Router>
        <PrivateRoute path="/destination/:transport">
          <Destination></Destination>
        </PrivateRoute>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
