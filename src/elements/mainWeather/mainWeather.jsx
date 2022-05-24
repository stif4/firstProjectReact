import React from "react";
import style from './mainWeather.module.css'

export const MainWeather = (props) => {
    return (
        <div className={style.content__section2}>
            <section className={style.todayWeather}>
                <div className={style.leftData}>
                    <div className={style.mainData}>
                        <div className={style.temp} >Сейчас:{props.temp > 0 ? ` +${props.temp}` : props.temp} °С</div>
                        <img className={style.icon} src={`../img/${props.icon}@2x.png`} alt="" />
                    </div>
                    <div className={style.subData}>
                        <div className={style.feels} >Ощущается: {props.feels_like > 0 ? ` +${props.feels_like}` : props.feels_like} °C </div>
                        <div className={style.discription} >{props.description}</div>
                    </div>
                </div>
                <div className={style.rifghtData}>
                    <div className={style.precipitationVolume}>Объем осадков за час: {props.rain*100}%</div>
                    <div className={style.wind} >Скорость ветра: {props.wind_speed}м/c</div>
                    <div className={style.humidity} >Влажность: {props.humidity}%</div>
                </div>
            </section>
        </div>
    )
}
