import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import {useReactToPrint} from "react-to-print";
import axios from "axios";
import { Button, Modal,  Table} from "antd";
import { useRef } from "react";

export default function Bills() {
  const componentRef = useRef()
  const [BillsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false);
  const [ selectorBill , setSelectorBill] = useState(null)
  const dispatch = useDispatch();
  dispatch({ type: "hideLoading" });

  const getAllBills = () => {
    axios
      .get("/api/bills/get-bills")
      .then((res) => {
        dispatch({ type: "showLoading" });
        const data = res.data;
        data.reverse((a , b) => a.createdAt - b.createdAt)
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "name",
    },
    {
      title: "Customer",
  
      dataIndex: "customerName",
    
   
    },
    {
      title: "subTotal",
      dataIndex: "subTotal",
      key: "price",
    },
    {
      title: "VAT",
      dataIndex: "VAT",
    },
        {
            title:"Total",
            dataIndex: "totalAmount"
        },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className=" d-flex">
        <EyeOutlined className="mx-2" onClick={() =>  { 
          setSelectorBill(record) 
        setPrintBillModalVisibility(true) }} />
        </div>
      ),
    },
  ];

  const cartColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title:"Quantity",
      dataIndex: "_id",
      render:(id, record) =>(
        <div>
          <b>{record.quantity}</b>
        </div>
      )
    },
    {
      title:"Total fare",
      dataIndex: "_id",
      render:(id, record) =>(
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      )
    }

  ];
  useEffect(() => {
    getAllBills();
  }, []);
  
  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
  })

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Items</h3>
         
        </div>
        <Table columns={columns} dataSource={BillsData} bordered />

        {printBillModalVisibility && (
          <Modal
            onCancel={() => {
              setPrintBillModalVisibility(false)
            }}
           
            title="Bills Details"
            footer={false}
            visible = {printBillModalVisibility}
            width = {800}
          >
          
          <div className="bill-model" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
              <h1><b>Vaultify MARKET</b></h1>
              </div>
              <div>
                <p>Vautify </p>
                <p>CCIS</p>
                <p>966555555</p>
              </div>
              </div>
            <div className="bill-customer-details my-2">
            <p> <b>Name:</b>  {selectorBill.customerName}</p>
            <p> <b>Phone Number:</b>  {selectorBill.customerPhoneNumber}</p>
            <p> <b>Date:</b>  {selectorBill.createdAt.toString().substring(0,10)}</p>
            </div>
           <Table dataSource={selectorBill.cartItems} columns = {cartColumns} pagination={false} />
          
            <div className="dotted-border my-2">
            <p> <b>SUB TOTAL : {selectorBill.subTotal} </b></p>
            <p> <b>VAT</b> : {selectorBill.VAT}</p>
            </div>

            <div className="my-2">
              <h2><b>GRAND TOTAL : {selectorBill.totalAmount}</b></h2>
            </div>
            <hr />
            <div className="text-center">
              <p>Thanks </p>
              <p>Visit Again :)</p>
            </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" onClick={handlePrint}>
              Print Bill
              </Button>
            </div>
          </Modal>
        )}
      </DefaultLayout>
    </>
  );
}
