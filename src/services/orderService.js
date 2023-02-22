import client from "../client"

// get orderHistory
export async function getOrderHistory() {
    try {
        const response = await client().get('/order/history')
        return response.data

    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function addToCart({ productId, quantity = 1 }) {
    try {
        const response = await client().post('/order/addToCart/' + productId, {
            quantity
        })
        return response.data

    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function changeQuantity({ productId, quantity }) {
    try {
        const response = await client().put('/order/changeQuantity/' + productId, {
            quantity
        })
        return response.data

    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function getCart() {
    try {
        const response = await client().get('/cart')
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function clearCart() {
    try {
        const response = await client().put('/order/clearCart')
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function checkout(payload) {
    try {
        const response = await client().put('/order/checkOut', payload)
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}