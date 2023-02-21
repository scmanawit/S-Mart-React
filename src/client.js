import axios from 'axios'

const client = () => {
    const token = localStorage.getItem('token')
    console.log('DEBUG: token', token)
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

export default client();