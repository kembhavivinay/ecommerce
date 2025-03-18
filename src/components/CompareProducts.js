import React from 'react';
import {Button,Table,message,Select} from "antd"
import { useProductContext } from '../context';

const CompareProducts = () => {
    const { Option } = Select;
    const {tableDataSource,selectedProducts,updateSelectedProducts,addSelectedProducts} = useProductContext();
    const removeProduct = (id) =>{
        const filteredProducts = selectedProducts.filter((p) => p.id !== id);
        addSelectedProducts(filteredProducts);
    }

    const addProduct = (productId) =>{
        if (selectedProducts.length >= 4) {
            console.log("checl",selectedProducts.length)
            message.error("Compare only 4 products");
            return;
        }
        const product = tableDataSource.find((p) => p.id === productId);
        if (product && !selectedProducts.some((p) => p.id === productId)) {
            updateSelectedProducts(product);
        }
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
            {selectedProducts.length > 0 && <div style={{ marginTop: "20px" }}>
                <Select placeholder="Add a Product" onChange={addProduct} style={{ width: 200 }}>
                {tableDataSource
                    .filter((p) => !selectedProducts.some((sp) => sp.id === p.id))
                    .map((product) => (
                        <Option key={product.id} value={product.id}>{product.title}</Option>
                    ))}
                </Select>
            </div>}
        </div>
    );
}

export default CompareProducts;