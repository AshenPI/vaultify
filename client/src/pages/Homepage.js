import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col,  Row } from 'antd';
import Item from "../components/Item";
import "../resources/item.css";
function Homepage() {
  const [itemsData, setItemData] = useState([]);
  const getAllItems = () => {
    axios
      .get("/api/items/getall")
      .then((res) => {
        
        setItemData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // async function getAllItems(){
  //   const res = await fetch("/api/items/getall")
  //   const data = await res.json();
  //   setitemData(data);

  // }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
    {/* <Container fluid>
        <Row>
          {itemsData.map((item) => {
            return (
              <Col>
                <Item item={item} />
                {console.log(item.name)}
              </Col>
            );
          })}
        </Row>
      </Container> */}
   
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
