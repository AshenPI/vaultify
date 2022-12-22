import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col,  Row } from 'antd';
import Item from "../components/Item";
import "../resources/item.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemData] = useState([]);
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
        console.log(error);
      });
  };


  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
   
   <DefaultLayout>
   
      
        <Row gutter={30}>
          {itemsData.map((item , i) => {
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
