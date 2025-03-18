import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({handleMenuHighlight}) => {
    const navigate = useNavigate();
    const [tableDataSource, setTableDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowKey, setSelectedRowKey] = useState(localStorage.getItem("selectedRowKey") || '');
    const columns = [
        { title: "Product Name",dataIndex: "title", key: "title",sorter: (a,b) => a.title.localeCompare(b.title)},
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a 
                    onClick={() => !(selectedRowKey == record.id) 
                        && handleProductClick(record)}
                    disabled={selectedRowKey == record.id}
                >Compare</a>
            ),
          },
    ];
    

    const fetchData = async() =>{
        const resp = await fetch('https://dummyjson.com/products');
        const data = await resp.json();
        const {products} =  data;
        setTableDataSource(
            products.map((item) =>{
                return{...item}
            })
        );
        setLoading(false)
    }

    useEffect(() =>{
        fetchData();
    },[]);


    const handleProductClick = (record) =>{
        setSelectedRowKey(record.id);
        localStorage.setItem("selectedRowKey", record.id);
        handleMenuHighlight("2");
        localStorage.setItem("selectedProduct", JSON.stringify(record));
        navigate("/compare-page",{state:JSON.parse(localStorage.getItem('selectedProduct'))})
    }
    if(loading){
        return(
            <h4>Loading....</h4>
        )
    }

    return (
        <div>
            {!loading && <Table 
                dataSource={tableDataSource} 
                rowClassName={(record) => (record.id == selectedRowKey ? 'highlight' : '')}
                columns={columns} 
                pagination={{ pageSize: 5 }} 
            />}
        </div>
    );
}

export default ProductDetail;