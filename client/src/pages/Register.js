import React from 'react'
import {Form, Input , message , Button, Row, Col} from "antd";
import "../resources/auth.css";
import vaultlogo from "../components/vaultlogo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
export default function Register() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    function onFinish(values){
            dispatch({type: "showLoading"});
    axios.post("/api/users/register" , values).then((res) =>{
        dispatch({type: "hideLoading"});
        message.success("Registerd successfully, please wait for verification")
    
    }).catch((error)=>{
        dispatch({type: "hideLoading"});
        message.error("Something went wrong");
        console.log(error.data);
    })
}
// useEffect(() => {
  
//   if(localStorage.getItem("pos-user")){
//     navigate("/home")
//   }
  
// }, []);
    
  return (
    <div className='authentication'>
        <Row >
       <Col lg={8} xs={22}>
       <Form  layout="vertical" onFinish={onFinish}>
       <h1><img src={vaultlogo} alt="" width="60px" /></h1>
       <hr />
       <h3>Register</h3>
          <Form.Item name='name' label="UserName">
          <Input />    
          </Form.Item>
          <Form.Item name='userId' label="User ID">
          <Input type='password' />    
          </Form.Item>
          <Form.Item name='password' label="Password">
          <Input type='password' />    
          </Form.Item>

        
          <div className="d-flex justify-content-between align-items-center">
          <Link to="/login">Already Registerd ? click here to login</Link>
            <Button htmlType="submit" type="primary" >Login</Button>
          </div>
          </Form>
       </Col>
        </Row>
        
    </div>
  )
}
