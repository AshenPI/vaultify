import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col,  Row } from 'antd';
import Item from "../components/Item";
import "../resources/item.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemData] = useState([]);
  const [selectorCategory , setSelectorCategory] = useState("sandwich")
  const categories = [
    {
      name:"sandwich",
      imageURL : 'https://thumbs.dreamstime.com/b/delicious-sliced-club-sandwich-white-background-isolated-141213337.jpg',

    },
    {
      name:"sides",
      imageURL : 'https://thumbs.dreamstime.com/b/bunch-fried-french-fries-white-background-close-up-bunch-fried-french-fries-white-background-close-up-isolated-121978100.jpg',

    },
    {
      name:"drinks",
      imageURL : 'https://thumbs.dreamstime.com/b/vector-illustration-classic-coca-cola-can-isolated-white-background-editorial-use-coca-cola-company-most-popular-185464472.jpg',

    },
  ]
  const dispatch = useDispatch()
  dispatch({type: "hideLoading"})

  
  const getAllItems = () => {
    axios
      .get("/api/items/getall")
      .then((res) => {
        dispatch({type: "showLoading"})
   
        setItemData(res.data);
      })
      .catch((error) => {
        dispatch({type: "showLoading"})
        console.log(error.data);
      });
  };


  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
   
   <DefaultLayout>
    <div className="d-flex">
    {categories.map((category) =>{
      return <div 
      onClick={()=>  setSelectorCategory(category.name)}
      className={`d-flex category ${selectorCategory === category.name && 'selected-category'}`}>
        <h4>{category.name}</h4>
        <img src={category.imageURL} alt="" height="60px" width="80px" />

      </div>
    })}
    </div>
      
        <Row gutter={30}>
          {itemsData.filter((i)=> i.category === selectorCategory).map((item , i) => {
            return (
              <Col key={i}  xs={24} lg={6} md={12} sm={6}>
                <Item item={item} />
                
              </Col>
            );
          })}
        </Row>
      
      
      </DefaultLayout>
    
       
    </>
  );
  
}

export default Homepage;
