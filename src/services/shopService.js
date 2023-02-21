import client from "../client.js";

export async function createShop({ shopName, description }) {
    try {
        const response = await client().post('/shop/register', {shopName, description})
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function updateShop({ shopId, shopName, description }) {
    try {
        const response = await client().put(`/shop/update/${shopId}`, {shopName, description})
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

export async function getUnverifiedShops() {
    try {
        const response = await client().get('/shop/unverified')
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function deleteShop(shopId) {
    try {
        const response = await client().delete(`/shop/delete/${shopId}`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function activateShop(shopId) {
    try {
        const response = await client().put(`/shop/activate/${shopId}`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function verifyShop(shopId) {
    try {
        const response = await client().put(`/shop/verify/${shopId}`)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}