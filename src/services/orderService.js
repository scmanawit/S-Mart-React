// get orderHistory
export async function getOrderHistory() {
    try {
        const response = await client.get('/order/history')
        return response.data

    } catch (error) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')

    }
}