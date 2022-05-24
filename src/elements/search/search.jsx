import React, { useEffect } from "react";
import style from './search.module.css'

export const Search = (props) => {

    useEffect(() => {
        let text = searchInput.current.value
        props.getLocationTrunk(text)
    }, [])

    let searchInput = React.createRef()
    const changeInput = (e) => {
        props.cangeSearchInput(e.target.value)
    }
    const searchCity = () => {
        let text = searchInput.current.value
        props.getLocationTrunk(text)
    }

    return (
        <section className={style.search}>
            <div className={style.container}>
                <input className={style.input} ref={searchInput} onChange={changeInput} value={props.searchInput} />
                <div onClick={searchCity} className={`${style.search__button} ${style.button}`}>
                    <button  className={style.btn}></button>
                    <img className={style.icon} src={"../img/lop.png"} alt="lop" />
                </div>
            </div>
        </section>
    )
}