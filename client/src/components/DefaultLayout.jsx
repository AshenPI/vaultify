import React, { useState } from "react";
import "../resources/layout.css";
import { MdRestaurantMenu, MdHistory, MdEditNote } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useSelector} from "react-redux";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,

} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import vaullogo from "../components/output-onlinepngtools.png";
import { Layout, Menu, theme } from "antd";
import { useEffect } from "react";
const { Header, Sider, Content } = Layout;
function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {cartItems , loading} = useSelector(state => state.rootReducer)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(()=>{
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
  } , [cartItems])
  return (
    <Layout>
    {loading && (
     <div className="spinner">
  <div className="spinner-border" role="status">
    </div>
  </div>

    )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {" "}
          <img src={vaullogo} alt="" width="60px" />{" "}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/home",
              icon: (
                <Link to="/home">
                  {" "}
                  <DashboardOutlined />{" "}
                </Link>
              ),
              label: "Dashboard",
            },

            {
              key: "/menu",
              icon: (
                <Link to="/items">
                  {" "}
                  <MdRestaurantMenu />{" "}
                </Link>
              ),
              label: "Items",
            },
            {
              key: "/users",
              icon: (
                <Link to="/Users">
                  {" "}
                  <TbUsers />{" "}
                </Link>
              ),
              label: "Users/Casheirs",
            },
            {
              key: "/orders",
              icon: (
                <Link to="/orders">
                  {" "}
                  <MdHistory />{" "}
                </Link>
              ),
              label: "Orders",
            },
            // {
            //   key: "/makeorder",
            //   icon: (
            //     <Link to="makeorder">
            //       {" "}
            //       <MdEditNote />{" "}
            //     </Link>
            //   ),
            //   label: "Make An Order",
            // },
        
            

            {
              key: "/logout",
              icon : (
                <Link to="/login" onClick={()=>{
                    localStorage.removeItem("pos-user")
                  
                  }} >
                  {" "}
                  <HiOutlineLogout   />{" "}
                </Link>
              ),
              label: "logout",
            }
            // {
            //   key: "/logout",
            //   icon : (
            //     <Link to="/" 
            //      >
            //       {" "}
            //       <HiOutlineLogout   />{" "}
            //     </Link>
            //   ),
            //   label: "logout",
            // }
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
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className=" cart-count d-flex align-items-center" onClick={()=> navigate("/cart")}>
           <b> <p className="mt-3">{cartItems.length}</p></b>
           
           <AiOutlineShoppingCart size="20px" />
          </div>
        </Header>
        <Content
          style={{
            margin: " 10px ",
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
}
export default DefaultLayout;
