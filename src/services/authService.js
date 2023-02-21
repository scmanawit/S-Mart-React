import client from "../client.js";
import {profile} from "./userService.js";

export async function login({email, password}) {
    try {
        const response = await client().post('/login', {
            email,
            password
        })

        if (!response.data.auth) {
            throw new Error('Authentication failed!')
        }

        localStorage.setItem('token', response.data.auth)

        await profile()
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export async function register({email, name, password}) {
    try {
        const response = await client().post('/register', {
            email,
            password,
            name
        })

        return response?.data
    } catch (e) {
        throw new Error(e?.response?.data || e?.message || 'Something went wrong!')
    }
}

export function logout() {
    localStorage.clear()
}