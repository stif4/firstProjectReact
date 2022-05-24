import React from "react";
import s from './Loader.module.css'

const Loader = (props) => {
    return (
        <div className={s.wrapper} >
            <span className={s.loader}></span>
        </div>
    )
}
export default Loader