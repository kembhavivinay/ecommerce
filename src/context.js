import {useContext,useState,createContext} from 'react';

const ProductContext = createContext();

const ProductProvider = ({children}) =>{
    const [selectedRowKey, setSelectedRowKey] = useState('');
    const [selectedProducts,setSelectedProducts] = useState([]);
    const [tableDataSource, setTableDataSource] = useState([]);
    const [menuHighlight, setMenuHighlight] = useState('1');

      const handleMenuHighlight = (key) =>{
        setMenuHighlight(key);
      }

    const handleSelectedRow = (id) =>{
        setSelectedRowKey(id)
    }

    const updateSelectedProducts = (record) =>{
        setSelectedProducts([...selectedProducts,record])
    }

    const addSelectedProducts = (record) =>{
        setSelectedProducts(record)
    }

    const handleTableDataSource = (products) =>{
        setTableDataSource(products.map(item => {
            return {key:item.id,...item}
        }))
    }
    return(
        <ProductContext.Provider
            value={{
                menuHighlight,
                handleMenuHighlight,
                tableDataSource,
                handleTableDataSource,
                selectedRowKey,
                handleSelectedRow,
                selectedProducts,
                updateSelectedProducts,
                addSelectedProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}
export {ProductContext,ProductProvider};
