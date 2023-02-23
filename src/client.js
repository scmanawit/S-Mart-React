import axios from 'axios'

const client = () => {
    const token = localStorage.getItem('token')
    const defaultOptions = {
        baseURL: https://capstone-3-api.onrender.com,
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    };


    return axios.create(defaultOptions);
};

export default client;