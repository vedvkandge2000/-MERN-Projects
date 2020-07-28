import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID rbExvycXD0iJ-1QIxG7mEXlCyvBKTrdz0ZOCCi8u_DE' 
    }
});