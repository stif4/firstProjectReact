import React from "react";
import style from './weekWeather.module.css'

const WeekWeather = (props) => {

    const setChart = (id) => {
        if(id===5){ /// костыль, погодные данные aip на 5 дней
            props.setActiveId(id)
            props.setCurrentDatagraphik(0)
        }
        else{
            props.setActiveId(id)
            props.setCurrentDatagraphik(id)
        }
    }

    let arrayCards = props.weekWeather.array.map(p => {
        return <div onClick={()=>setChart(p.id)} className={`${style.card} ${p.id === props.weekWeather.togleActive ? style._active : null}`}>
            <div className={style.data}>{p.dt}</div>
            <img className={style.icon} src={`../img/${p.icon}@2x.png`} alt="" />
            <div className={style.temp} >{p.temp > 0 ? ` +${p.temp}` : p.temp} °С</div>
            <div className={style.discription} >{p.description}</div>
        </div>
    })

    return (
        <div className={style.content__section3}>
            <section className={style.weatherOnWeek}>
                <div className={style.cards}>
                    {arrayCards}
                </div>
            </section>
        </div>
    )
}
export default WeekWeather