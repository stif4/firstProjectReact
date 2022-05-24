// import moment from "moment-timezone";
import React from "react";
import { connect } from "react-redux";
import { setCurrentTime } from "../../store/weather_reducer";
import { Time } from "./time";
import style from './time.module.css'

class TimeClass extends React.Component {

    componentDidMount() {
        this.clock()
    }

    clock = () => {
        
        let currentDateLocation = new Date()
        let currentDateGrinwich = new Date(currentDateLocation.getTime()+(60*currentDateLocation.getTimezoneOffset()*1000))         
        let DateThisTimeZone = new Date(currentDateGrinwich.getTime() + this.props.timeZone * 1000)

        let hours = DateThisTimeZone.getHours()
        let minutes = DateThisTimeZone.getMinutes()
        let seconds = DateThisTimeZone.getSeconds()

        if (hours < 10) { hours = '0' + hours }
        if (minutes < 10) { minutes = '0' + minutes }
        if (seconds < 10) { seconds = '0' + seconds }

        let time = hours + ':' + minutes + ':' + seconds

        this.props.setCurrentTime(time)
        
        setTimeout(() => {
            this.clock()
        }, 1000)
    }

    render() {
        return (
            <Time {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeZone: state.weatherPage.currentTimeZone,
        currentTime: state.weatherPage.currentTime,
        currentDate: state.weatherPage.weekWeather.array[0].dt
    }
}
export default connect(mapStateToProps, { setCurrentTime })(TimeClass)