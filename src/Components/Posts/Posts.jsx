import React,{useState, useEffect, useContext} from 'react';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../Firebase/config';
import { PostContext } from '../../store/PostContext';


function Posts() {
const navigate = useNavigate()
const [products,setProducts] = useState([])
const {setPostDetails} = useContext(PostContext)
useEffect(()=>{
const getData = async() => {
  await getDocs(collection(db,"products")).then((snapshot)=>{
    const allPosts = snapshot.docs.map((product)=>{
     return {
      ...product.data(),
      id:product.id
    }
    })
    setProducts(allPosts)
  })
}
getData()
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { products.map((product)=>{
          return <div key={product.id}
          onClick={()=>{
            setPostDetails(product)
            navigate('/view')
          }}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name"> {product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
