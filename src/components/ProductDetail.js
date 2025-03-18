import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context';

const ProductDetail = () => {
    const {handleMenuHighlight,tableDataSource,handleTableDataSource,selectedRowKey,handleSelectedRow,addSelectedProducts} = useProductContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const fetchData = async() =>{
        const resp = await fetch('https://dummyjson.com/products');
        const data = await resp.json();
        const {products} =  data;
        handleTableDataSource(products);
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[]);


    const handleProductClick = (record) =>{
        handleSelectedRow(record.id)
        handleMenuHighlight("2");
        addSelectedProducts([record]);
        navigate("/compare-page")
    }

    const columns = [
        { title: "Product Name", dataIndex: "title", key: "title", sorter: (a, b) => a.title.localeCompare(b.title) },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a 
                    onClick={() => selectedRowKey !== record.id && handleProductClick(record)}
                    disabled={selectedRowKey == record.id}
                >
                    Compare
                </a>
            ),
        },
    ];


    return (
        <div>
            {loading ? <h4>Loading....</h4> : 
                <Table 
                    dataSource={tableDataSource} 
                    rowClassName={(record) => (record.id == selectedRowKey ? 'highlight' : '')}
                    columns={columns} 
                    pagination={{ pageSize: 5 }} 
                />
            }
        </div>
    );
}

export default ProductDetail;