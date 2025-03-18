import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Button,Table} from "antd"

const CompareProducts = () => {
    const [selectedProducts,setSelectedProducts] = useState(() =>{
        if(localStorage.getItem('selectedProduct')){
            return [JSON.parse(localStorage.getItem('selectedProduct'))];
        }
        return [];
    });

    const removeProduct = (id) =>{

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
    
        const features = ["Price", "Brand", "Rating", "Action"];
        const data = features.map((feature, index) => {
        const row = { key: (index + 1).toString(), feature };
        selectedProducts.forEach((p,productIndex) => {
            console.log(productIndex)
            if (feature === "Price") row[p.id] = p.price;
            else if (feature === "Brand") row[p.id] = p.brand;
            else if (feature === "Rating") row[p.id] = p.rating;
            else if (feature === "Action" && productIndex !== 0) row[p.id] =  <Button danger onClick={() => removeProduct(p.id)}>Remove</Button>;
        });

        return row;
        });
    return (
        <div>
            <h2>Compare Products</h2>
            <Table columns={columns} dataSource={data} pagination={false} bordered />
        </div>
    );
}

export default CompareProducts;