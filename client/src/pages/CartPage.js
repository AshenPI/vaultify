import { Table } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {
    DeleteOutlined ,
    PlusCircleOutlined,
    MinusCircleOutlined
  } from '@ant-design/icons';

export default function CartPage() {
    const {cartItems} = useSelector(state=> state.rootReducer)
    const dispatch = useDispatch()
    function increaseQuantity(record){
        dispatch({type : "updateCart" , payload : {...record , quantity: record.quantity + 1}})
    }

    function decreaseQuantity(record){
        if(record.quantity !== 1){
            dispatch({type : "updateCart" , payload : {...record , quantity: record.quantity - 1}})   
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key:"name"

        },
        {
            title:"Item",
            Image: "Image",
            dataIndex: "image",
            render : (image , record)=> <img src={image} alt="" height="60px" width = "60px" />,
            key:"image"
        },{
            title: "Price",
            dataIndex: "price",
            key:"price"
        },
        {
            title:"Quantity",
            dataIndex: "_id",
            render: (id , record) => <div> <PlusCircleOutlined  className='mx-3' onClick={()=> increaseQuantity(record)}/> <b>{record.quantity}</b> <MinusCircleOutlined className="mx-3" onClick={() => decreaseQuantity(record)} /> </div>
        },
        {
            "title": "Actions",
            dataIndex: "_id",
            render:(id , record)=> <DeleteOutlined className='mx-3' onClick={()=> dispatch({type: 'deleteFromCart' , payload : record})}  />
        }
    ]
  return (
    <DefaultLayout>
        <h3>Cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered  />
    </DefaultLayout>
  )
}
