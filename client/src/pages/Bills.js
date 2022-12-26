import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined  , EyeOutlined } from "@ant-design/icons";

import axios from "axios";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";

export default function Bills() {
  const [BillsData, setBillsData] = useState([]);
  const [addEditModel, setAddEditModel] = useState(false);
  const [editingItem, setEditItem] = useState(null);
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
        <EyeOutlined className="mx-2" onClick={() => {} } />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBills();
  }, []);
  

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Items</h3>
          <Button type="primary" onClick={() => setAddEditModel(true)}>
            Add Item
          </Button>
        </div>
        <Table columns={columns} dataSource={BillsData} bordered />

        {addEditModel && (
          <Modal
            onCancel={() => {
              setAddEditModel(false);
              setEditItem(null);
            }}
            open={addEditModel}
            title={`${editingItem !== null ? "Edit Items" : "Add New Item"}`}
            footer={false}
          >
        
          </Modal>
        )}
      </DefaultLayout>
    </>
  );
}
