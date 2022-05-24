import { connect } from "react-redux";
import { MainWeather } from "./mainWeather";

const mapStateToProps = (state) => {
    return {
        description: state.weatherPage.todayWeather.description,
        icon: state.weatherPage.todayWeather.icon,
        wind_speed: state.weatherPage.todayWeather.wind_speed,
        humidity: state.weatherPage.todayWeather.humidity,
        temp: state.weatherPage.todayWeather.temp,
        feels_like: state.weatherPage.todayWeather.feels_like,
        rain: state.weatherPage.todayWeather.rain
    }
}

const MainWeatherContainer = connect(mapStateToProps, {})(MainWeather)
export default MainWeatherContainer
