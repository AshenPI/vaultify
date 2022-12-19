import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
// import { Col,  Row } from 'antd';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../components/Item";

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
   
      <Container fluid>
        <Row>
          {itemsData.map((item , i) => {
            return (
              <Col key={i}>
                <Item item={item} />
                {console.log(item.name)}
              </Col>
            );
          })}
        </Row>
      </Container>
      
      </DefaultLayout>
    
       
    </>
  );
  
}

export default Homepage;
