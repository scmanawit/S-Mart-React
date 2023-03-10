import client from "../client"


export async function getAllActiveProducts(category) {
    try {
        let url = '/product'
        if (category) {
            url = `/product?categories=${category}`
        }
        const response = await client().get(url)
        return response.data

    } catch (error) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')

    }
}

export async function createShopProduct({shopId, productName, description, price, categories, stocks, image}) {
    try {
        const response = await client().post(`/product/${shopId}`, {productName, description, price, categories, stocks, image})
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function updateShopProduct({productId, productName, description, price, categories, stocks, image}) {
    try {
        const response = await client().put(`/product/${productId}`, {productName, description, price, categories, stocks, image})
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function deleteShopProduct(productId) {
    try {
        const response = await client().delete(`/product/${productId}`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function activateShopProduct(productId) {
    try {
        const response = await client().put(`/product/activate/${productId}`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function getProductCategories() {
    try {
        const response = await client().get(`/product/categories`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}