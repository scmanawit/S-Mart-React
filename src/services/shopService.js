import client from "../client.js";

export async function createShop({ shopName, description }) {
    try {
        const response = await client().post('/shop/register', {shopName, description})
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function getMyShops() {
    try {
        const response = await client().get('/shop/all')
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}
