import { connect } from "react-redux";
import { setActiveId, setCurrentDatagraphik } from "../../store/weather_reducer";
import WeekWeather from "./weekWeather";

const mapStateToProps = (state) => {
    return {
        weekWeather: state.weatherPage.weekWeather
    }
}

const WeekWeatherContainer = connect(mapStateToProps, {setActiveId,setCurrentDatagraphik})(WeekWeather)
export default WeekWeatherContainer