import axios from 'axios';

export default axios.create({
    baseURL: 'https://fullstackfooddeliveryapp-production.up.railway.app' || 'http://localhost:5000/'
});