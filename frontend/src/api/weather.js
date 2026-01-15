import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:5000/api/weather"
})

export const getWeather = (city) =>{
    return api.get(`/?city=${city}`);
}