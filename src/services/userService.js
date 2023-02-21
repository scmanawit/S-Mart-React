import client from "../client.js";

export async function profile() {
    try {
        const response = await client().get('/user/profile')
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("user")) || null
}