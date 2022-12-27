import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined  , EyeOutlined } from "@ant-design/icons";
import {useReactToPrint} from "react-to-print";
import axios from "axios";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import { useRef } from "react";

export default function Customers() {
  const componentRef = useRef()
  const [BillsData, setBillsData] = useState([]);

  const dispatch = useDispatch();
  dispatch({ type: "hideLoading" });

  const getAllBills = () => {
    axios
      .get("/api/bills/get-bills")
      .then((res) => {
        dispatch({ type: "showLoading" });

        setBillsData(res.data);
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        console.log(error);
      });
  };

  const columns = [
 
    {
      title: "Customer",
  
      dataIndex: "customerName",
    
   
    },
    {
        title: "Phone Number",
        dataIndex:  "customerPhoneNumber"
    },
  
    {
      title: "created On",
      dataIndex: "createdAt",
      render: (value) =><span>{value.toString().substring(0,10)}</span>
    },
        {
            title:"Total",
            dataIndex: "totalAmount"
        },
  
  ];

 
  useEffect(() => {
    getAllBills();
  }, []);
  

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Customers</h3>
         
        </div>
        <Table columns={columns} dataSource={BillsData} bordered />

      
      </DefaultLayout>
    </>
  );
}
