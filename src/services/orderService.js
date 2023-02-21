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