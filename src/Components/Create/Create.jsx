import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { db} from '../../Firebase/config';
import { doc, setDoc } from "firebase/firestore"; 
import { AuthContext } from '../../store/Context';

const Create = () => {
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [error,setError] = useState('')
  const date = new Date()
  const navigate = useNavigate()
  const handleSubmit = () => {
    if(!user){
      setError('please login to add product');
      return
    }
    const storage = getStorage();
    const storageRef = ref(storage, `/image/${image.name}`);
    uploadBytes(storageRef, image)
      .then(() => {
        return getDownloadURL(storageRef);
      }).then(async(url) => {
        await setDoc(doc(db, "products",Date.now().toString()), {
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
      }).then(()=>{
        navigate('/')
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            {!user && <p style={{color:'red'}}>{error}</p>}
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
              }} />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
        
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
