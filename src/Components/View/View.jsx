import React, {useState, useEffect, useContext} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";

import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../Firebase/config';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetailes} = useContext(PostContext)
  useEffect(()=>{
    const {userId} = postDetailes
    const userDetail = async()=>{
      const data = query(collection(db, "users"), where("id", "==", userId));
      const user = await getDocs(data)
      user.forEach((doc)=>{
        setUserDetails(doc.data());
      })
    }
    userDetail()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetailes.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetailes.price} </p>
          <span>{postDetailes.name}</span>
          <p>{postDetailes.category}</p>
          <span>{postDetailes.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
