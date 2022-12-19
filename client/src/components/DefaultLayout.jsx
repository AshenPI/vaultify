import React, { useState } from 'react';
import "../resources/layout.css";
import {
  MdRestaurantMenu,
  MdHistory,
  MdEditNote

    } from "react-icons/md";
    import {TbUsers} from "react-icons/tb";
    import {HiOutlineLogout} from "react-icons/hi";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined
  
} from '@ant-design/icons';
import {Link} from "react-router-dom";
//import vaultlogo from "../components/vaultlogo.png";
import vaullogo from "../components/output-onlinepngtools.png"
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
function DefaultLayout({children}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"> <img src={vaullogo} alt="" width="60px" /> </div>  
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            
          
            {
              key: "/home",
              icon: <Link to="/home"> <DashboardOutlined /> </Link>  ,
              label: 'Dashboard',
            } ,
            
            {
              key: "/menu",
              icon: <Link to="/menu"> <MdRestaurantMenu /> </Link>,
              label: 'Menu',
            },
            {
              key: "/users",
              icon: <Link to="/Users"> <TbUsers /> </Link> ,
              label: 'Users/Casheirs',
            },
            {
              key:"/orders",
              icon: <Link to="/orders"> <MdHistory /> </Link>,
              label:'Orders',

            },
            {
              key:"/makeorder",
              icon: <Link to="makeorder" > <MdEditNote  /> </Link>,
              label:'Make An Order'
            },
            {
              key:"/logout",
              icon: <Link to="logout"> <HiOutlineLogout /> </Link>,
              label:"logout"
            }
          ]}
        />
     
      </Sider>
      
      <Layout className="site-layout">
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
          }}
          > 
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: ' 10px ',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;