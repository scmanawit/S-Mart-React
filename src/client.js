import axios from 'axios'

const client = () => {
    const token = localStorage.getItem('token')
    const defaultOptions = {
        baseURL: 'http://localhost:4000',
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    };


    return axios.create(defaultOptions);
};

export default client;