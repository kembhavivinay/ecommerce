import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Layout, Menu } from "antd";
import ProductDetail from "./components/ProductDetail";
import CompareProducts from "./components/CompareProducts";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [menuHighlight, setMenuHighlight] = useState('1');
  const handleMenuHighlight = (key) =>{
    setMenuHighlight(key);
  }
  return (
    <Router>
      <Layout style={{minHeight:"100vh"}}>
        <Header style={{display:"flex",justifyContent:"space-between",background:"darkBlue"}}>
          <div style={{color:"white"}}>My Logo</div>
          <div style={{color:"white"}}>user login</div>
        </Header>
        <Layout>
          <Sider width={240}>
            <Menu selectedKeys={[menuHighlight]} style={{height:"100%"}}>
              <Menu.Item key="1">
                <Link to={'/product-detail'} onClick={() => setMenuHighlight("1")}>Product Details</Link> 
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/compare-page'} onClick={() => setMenuHighlight("2")}>Compare Details</Link> 
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Routes>
                <Route path="/product-detail" element={<ProductDetail handleMenuHighlight={handleMenuHighlight}/>} />
                <Route path="/compare-page" element={<CompareProducts />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;