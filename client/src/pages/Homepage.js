import React, { useEffect, useState } from 'react'
import DefLayout from '../components/DefLayout'
import axios from "axios";
import { Col, Row } from 'antd';
import Item from '../components/Item';

export default function Homepage() {
const [itemsData , setitemData] = useState([]);
  const getAllItems = ()=>{
    axios.get("/api/items/getall").then((res)=>{
      setitemData(res.data);
      
    }).catch((error)=>{
      console.log(error)
    })
  }
  // async function getAllItems(){
  //   const res = await fetch("/api/items/getall")
  //   const data = await res.json();
  //   setitemData(data);
   
  // }
  useEffect(()=>{
    getAllItems();
  } ,[])
  return (
    
    <DefLayout>
      
    <Row >
      {itemsData.map((item )=>{
          console.log(item)
          return(
          
        <Col span={6} key={item.id}>
        <Item item={item}  />
        </Col>
        
     )})}
      </Row>
    </DefLayout>
  );
}
