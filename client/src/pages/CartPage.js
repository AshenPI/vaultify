import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [billCharge, setBillCharge] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function increaseQuantity(record) {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  }

  function decreaseQuantity(record) {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  }

  useEffect(() => {
    let temp = 0;

    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });

    setSubTotal(temp.toFixed(2));
  }, [cartItems]);

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
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          {" "}
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />{" "}
          <b>{record.quantity}</b>{" "}
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />{" "}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          className="mx-3"
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];

  function onFinish(values) {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      VAT: (Number(subTotal) * Number(0.15)).toFixed(2),
      totalAmount: (Number(subTotal) + Number(subTotal) * Number(0.15)).toFixed(2),
      userId: JSON.parse(localStorage.getItem("pos-user"))._id,
    };

    axios
      .post("/api/bills/charge-bill", reqObject)
      .then(() => {
        message.success("Bill charged successfully");
        navigate("/bills")
        
      })
      .catch((error) => {
        message.success("Something went wrong");
        console.log(error.data)
      });
  }
  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartItems} bordered />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subTotal">
          <h3>
            SUB TOTAL : <b>{subTotal} ريال </b>
          </h3>
        </div>
        <Button type="primary" onClick={() => setBillCharge(true)}>
          CHARGE BILL
        </Button>
      </div>

      <Modal
        title="Charge Bill"
        visible={billCharge}
        footer={false}
        onCancel={() => setBillCharge(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount ">
            <h5>
              SubTotal: <b>{Number(subTotal).toFixed(2)}</b>
            </h5>
            <h5>
              VAT: <b>{(Number(subTotal) * Number(0.15)).toFixed(2)} </b>
            </h5>

            <hr />
            <h2>
              TOTAL :{" "}
              <b>{(Number(subTotal) + Number(subTotal) * Number(0.15)).toFixed(2)} ريال</b>
            </h2>
          </div>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Pay
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}
