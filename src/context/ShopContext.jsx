

import React, { createContext } from "react";

const ShopContext = createContext({
    shops: [],
    getShops: () => { },
    selectedShop: null,
    setSelectedShop: () => { },
    selectedProduct: null,
    setSelectedProduct: () => { },
    openProductForm: false,
    openShopForm: false,
    setOpenProductForm: false,
    setOpenShopForm: false,
});

export default ShopContext;