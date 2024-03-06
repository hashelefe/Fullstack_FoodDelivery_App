import axios from 'axios';

export default axios.create({
    baseURL: 'https://fullstack-food-delivery-app-eight.vercel.app/' || 'http://localhost:5000/'
});