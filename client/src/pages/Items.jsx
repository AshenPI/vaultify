import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import axios from "axios";
import { Button, Form, Input, Modal, Select, Table  , message} from "antd";

export default function Items() {
  const [itemsData, setItemData] = useState([]);
  const [addEditModel , setAddEditModel] = useState(false);
  const [editingItem , setEditItem] = useState(null);
  const dispatch = useDispatch();
  dispatch({ type: "hideLoading" });

  const getAllItems = () => {
    axios
      .get("/api/items/getall")
      .then((res) => {
        dispatch({ type: "showLoading" });

        setItemData(res.data);
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    axios
      .post("/api/items/delete-item" ,{itemId: record._id} )
      .then((res) => {
        dispatch({ type: "showLoading" });
        message.success('Item deleted successfully');
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        message.error("Something went wrong")
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item",
      Image: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60px" width="60px" />
      ),
      key: "image",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category"
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className=" d-flex">
          <DeleteOutlined className="mx-2" onClick={()=> deleteItem(record)}/>
          <EditOutlined className="mx-2" onClick={()=> {
            setEditItem(record);
            setAddEditModel(true);


          } } />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);
function onFinish(values){

  dispatch({ type: "hideLoading" });

 
  if(editingItem === null){
    axios
      .post("/api/items/add-item" , values)
      .then((res) => {
        dispatch({ type: "showLoading" });
        message.success("Item added successfully")
          setAddEditModel(false);
          getAllItems()
       
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        message.error("something went wrong")
        console.log(error);
      });
  }
  else{
    axios
      .post("/api/items/edit-item" , {...values , itemId : editingItem._id})
      .then((res) => {
        dispatch({ type: "showLoading" });
        message.success("Item Editied successfully")
        setEditItem(null);
          setAddEditModel(false);
          getAllItems()
       
      })
      .catch((error) => {
        dispatch({ type: "showLoading" });
        message.error("something went wrong")
        console.log(error);
      });
  }
    // axios
    //   .post("/api/items/add-item" , values)
    //   .then((res) => {
    //     dispatch({ type: "showLoading" });
    //     message.success("Item added successfully")
    //       setAddEditModel(false);
    //       getAllItems()
       
    //   })
    //   .catch((error) => {
    //     dispatch({ type: "showLoading" });
    //     message.error("something went wrong")
    //     console.log(error);
    //   });
  };

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={()=> setAddEditModel(true)}>Add Item</Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered />
  
        {addEditModel &&(
          <Modal onCancel={()=>{
             setAddEditModel(false)
             setEditItem(null);
          }} open={addEditModel} title={`${editingItem !== null ? 'Edit Items' : 'Add New Item'}`} footer={false}>
          <Form initialValues={editingItem} layout="vertical" onFinish={onFinish}>
          <Form.Item name='name' label="Name">
          <Input />    
          </Form.Item>
          <Form.Item name='price' label="Price">
          <Input />    
          </Form.Item>
          <Form.Item name='image' label="Image URL">
          <Input />    
          </Form.Item>

          <Form.Item name='category' label="Category">
         <Select>
          <Select.Option value="sandwich">
            Sandwiches
          </Select.Option>
          <Select.Option value="sides">
            Sides
          </Select.Option>
          <Select.Option value="drinks">
            Drinks
          </Select.Option>
         </Select> 
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">Save</Button>
          </div>
          </Form>
        </Modal>
        )}
      </DefaultLayout>
    </>
  );
}
