import React, { createContext } from "react";

const CatalogContext = createContext({
    products: [],
    setProducts: () => { },
    selectedProduct: null,
    setSelectedProduct: () => { },
    getProducts: () => { },
    setOpenViewProductModal: () => {}
});

export default CatalogContext;