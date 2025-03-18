import React, {useState } from 'react';
import {Button,Table,message} from "antd"

const CompareProducts = () => {
    const [selectedProducts,setSelectedProducts] = useState(() =>{
        if(localStorage.getItem('selectedProduct')){
            return [JSON.parse(localStorage.getItem('selectedProduct'))];
        }
        return [];
    });

    const removeProduct = (id) =>{
        setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
    }

    const addProduct = () =>{
        if (selectedProducts.length >= 4) {
            message.error("Compare only 4 products");
            return;
        }
        const newProduct = {"id":2,"title":"Eyeshadow Palette with Mirror","price":100,"brand":"newBrand","rating":"6.6"}
        setSelectedProducts([...selectedProducts,newProduct]);
    }

    const columns = [
        {
          title: "Feature",
          dataIndex: "feature",
          key: "feature",
        },
        ...selectedProducts.map((product) => ({
          title: product.title,
          dataIndex: product.id,
          key: product.id,
          render: (text) => text,
        })),
      ];
    
        const features = ["Price", "Brand", "Category", "Action"];
        const data = features.map((feature, index) => {
        const row = { key: (index + 1).toString(), feature };
        selectedProducts.forEach((p,productIndex) => {
            if (feature === "Price") row[p.id] = p.price;
            else if (feature === "Brand") row[p.id] = p.brand;
            else if (feature === "Category") row[p.id] = p.category;
            else if (feature === "Action" && productIndex !== 0) row[p.id] =  <Button danger onClick={() => removeProduct(p.id)}>Remove</Button>;
        });

        return row;
        });
    return (
        <div>
            <h2>Compare Products</h2>
            <Table columns={columns} dataSource={data} pagination={false} bordered />
            <Button onClick={() => addProduct()}>Add More</Button>
        </div>
    );
}

export default CompareProducts;