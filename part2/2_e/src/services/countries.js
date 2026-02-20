import axios from 'axios';

const baseApi = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
    const request = axios.get(baseApi);
    return request.then(response => response.data);
}

export default {
    getAll: getAll
};