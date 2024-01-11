import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // for cookies
})

export default client;

// axios.get('/users') -> http://localhost:3000/api/users