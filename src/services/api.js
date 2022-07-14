import axios from "axios";

const api = axios.create({
    baseURL: 'https://paciente-ostomizado.herokuapp.com/'
})

export default api;