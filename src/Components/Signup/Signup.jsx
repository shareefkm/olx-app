import React, { useState,useContext } from 'react';
import { useNavigate, Link } from "react-router-dom"

import Logo from '../../olx-logo.png';
import './Signup.css';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth, db} from '../../Firebase/config';
import { doc, setDoc } from "firebase/firestore"; 

export default function Signup() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (userName.trim() === '' || phone.trim() === '') {
      setError('username and password must needed')
      return;
    }
    try{
      await createUserWithEmailAndPassword(auth,email,password).then(async(result)=>{
        updateProfile(auth.currentUser, {
          displayName: userName
        }).then(async() => {
          await setDoc(doc(db, "users", result.user.uid), {
            id:result.user.uid,
            name:userName,
            phone:phone
          }).then(()=>{
            navigate('/login')
          })
        })
        })
    }catch(err){
      console.log(err.code);
      setError(err.code)
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          {error && <p style={{color:"red"}}>{error}</p>}
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>{
              setUserName(e.target.value)
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
