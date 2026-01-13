import axios from "axios";

const getWeather = async(req,res)=>{
    try{
            const {city} = req.query
            if(!city){
                return res.status(400).json({
                    err: "city is required"
                })
            }
            
            const api = process.env.API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

            const response = await axios.get(url);
            const data = response.data

             return res.json({
                name: data.name,
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                description: data.weather[0].description,
                icon: data.weather[0].icon
                })
    }catch(err){
        return res.status(500).json({
            err : "Not Found!",
            details : err.message
        });
    }
}
export default getWeather;