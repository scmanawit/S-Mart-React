import client from "../client"

// get orderHistory
export async function getAllActiveProducts() {
    try {
        const response = await client().get('/product/')
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