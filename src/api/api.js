import axios from "axios"
const API_KEY = 'ba4d4ce20820685384ea09a187240b82'

export const weatherAPIdata = {
    getLocation: (city) => {
        return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${API_KEY}`).then(respons => {
            return respons.data
        })
    },
   
    getWeatherData: (lat,lon)=>{
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={current}&appid=${API_KEY}&lang=ru`).then(respons => {   
            return respons.data
        })
    },

    getWeatherDataToGraphik:(lat,lon) =>{
        return axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`).then(respons => {
            console.log(respons)    
            return respons.data
        })
    } 
}