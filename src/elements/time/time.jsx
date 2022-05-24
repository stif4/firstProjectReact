import React from "react";
import style from './time.module.css'

export const Time = (props) => {
    return (
        <section className={style.time}>
            <div className={style.container} >
                <div className={style.current} >{props.currentTime}</div>
                <div className={style.date}>{props.currentDate}</div>
            </div>
        </section>
    )
}