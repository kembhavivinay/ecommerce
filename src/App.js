import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { Layout, Menu } from "antd";
import ProductDetail from "./components/ProductDetail";
import CompareProducts from "./components/CompareProducts";
import { useProductContext } from "./context";

const { Header, Sider, Content } = Layout;

const App = () => {
  const {menuHighlight,handleMenuHighlight} = useProductContext();
  const items = [{
    label: <Link to={'/product-detail'} onClick={() => handleMenuHighlight("1")}>Product Details</Link>,
    key: "1"
  },
  {
    label: <Link to={'/compare-page'} onClick={() => handleMenuHighlight("2")}>Compare Details</Link>,
    key: "2"
  }]
  return (
    <Router>
      <Layout style={{minHeight:"100vh"}}>
        <Header style={{display:"flex",justifyContent:"space-between",background:"darkBlue"}}>
          <div style={{color:"white"}}>My Logo</div>
          <div style={{color:"white"}}>user login</div>
        </Header>
        <Layout>
          <Sider width={240}>
            <Menu selectedKeys={[menuHighlight]} style={{height:"100%"}} items={items} />
          </Sider>
          <Layout>
            <Content>
              <Routes>
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/compare-page" element={<CompareProducts />} />
                <Route path="/" element={<Navigate to="/product-detail" replace />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;