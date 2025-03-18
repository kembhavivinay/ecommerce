import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CompareProducts = () => {
    const [selectedProducts,setSelectedProducts] = useState(() =>{
        if(localStorage.getItem('selectedProduct')){
            return [JSON.parse(localStorage.getItem('selectedProduct'))];
        }
        return [];
    });
    console.log("select--",selectedProducts)
    return (
        <div>
            Compare Products
        </div>
    );
}

export default CompareProducts;