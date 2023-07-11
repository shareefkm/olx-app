import React, {useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {AuthContext} from './store/Context'

/**
 * ?  =====Import Components=====
*/
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import Post from './store/PostContext';


function App() {
  
const {user,setUser} = useContext(AuthContext)
useEffect(()=>{
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      // User is signed out
      // ...
    }
  });
})
  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path="/signup" element={ <Signup/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
