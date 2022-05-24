import { weatherAPIdata } from "../api/api"

const SET_LOCATION = 'SET_LOCATION'
const CANGE_SEARCH_INPUT = 'CANGE_SEARCH_INPUT'
const SET_WEATHER_CURRENT = ' SET_WEATHER_CURRENT'
const SET_WEATHER_HORLY = 'SET_WEATHER_HORLY'
const SET_WEATHER_WEEK = 'SET_WEATHER_WEEK'
const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
const SET_CURRENT_DATA_GRAPHIK = 'SET_CURRENT_DATA_GRAPHIK'
const SET_CURRENT_TIME_ZONE = 'SET_CURRENT_TIME_ZONE'
const SET_ACTIVE = 'SET_ACTIVE'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

const weatherList = {
    isFetching: true,
    location: {
        city: '',
        country: '',
        lat: null,
        lon: null,
    },
    todayWeather: {
        description: '',
        icon: '',
        wind_speed: 0,
        humidity: 0,
        temp: 0,
        feels_like: 0,
        rain: 0,
    },
    weekWeather: {
        array: [
            {
                id: 0,
                dt: '',
                temp: 0,
                icon: '',
                description: '',
            }
        ],
        togleActive: 0
    },
    twoDayWeatherHorly: {
        massData: [],
        massTemp: []
    },
    searchInput: 'Красноярск',
    currentTime: '00:00:00',
    currentTimeZone: 0,
    currentDataGraphik: {
        currentMassData: [],
        currentMassTemp: []
    },
}

export const weatherPage = (state = weatherList, action) => {
    switch (action.type) {
        case SET_LOCATION: {
            return {
                ...state,
                location: { ...state.location },
                location: { ...action }
            }
        }
        case CANGE_SEARCH_INPUT: {
            return {
                ...state,
                searchInput: action.cangeInput
            }
        }
        case SET_WEATHER_CURRENT: {
            return {
                ...state,
                todayWeather: {
                    ...state.todayWeather,
                    description: action.description,
                    icon: action.icon,
                    wind_speed: action.wind,
                    humidity: action.humidity,
                    temp: action.temp,
                    feels_like: action.feels_like,
                    rain: action.rain,
                },
            }
        }
        case SET_WEATHER_HORLY: {
            return {
                ...state,
                twoDayWeatherHorly: { ...state.twoDayWeatherHorly },
                twoDayWeatherHorly: {
                    massData: [...action.massData],
                    massTemp: [...action.massTemp]
                }
            }
        }
        case SET_WEATHER_WEEK: {
            return {
                ...state,
                weekWeather:{
                    ...state.weekWeather,
                    array: [...action.newArrayWeek]
                }
            }
        }
        case SET_CURRENT_TIME: {
            return {
                ...state,
                currentTime: action.time
            }
        }
        case SET_CURRENT_TIME_ZONE: {
            return {
                ...state,
                currentTimeZone: action.timeZone
            }
        }
        case SET_CURRENT_DATA_GRAPHIK: {
            return {
                ...state,
                currentDataGraphik: { ...state.currentDataGraphik },
                currentDataGraphik: {
                    currentMassData: state.twoDayWeatherHorly.massData[action.dataGraphik],
                    currentMassTemp: state.twoDayWeatherHorly.massTemp[action.dataGraphik]
                }
            }
        }
        case SET_ACTIVE: {
            return {
                ...state,
                weekWeather: {
                    ...state.weekWeather,
                    togleActive: action.setActiveId
                },
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.fetching
            }
        }
        default:
            return state
    }
}

export const setLocation = (city, country, lat, lon) => ({ type: SET_LOCATION, city, country, lat, lon })
export const cangeSearchInput = (cangeInput) => ({ type: CANGE_SEARCH_INPUT, cangeInput })
export const setWeatherCurrent = (dt, feels_like, humidity, rain, icon, temp, description, wind) => ({ type: SET_WEATHER_CURRENT, dt, feels_like, humidity, rain, icon, temp, description, wind })
export const setWeatherHorly = (massTemp, massData) => ({ type: SET_WEATHER_HORLY, massTemp, massData })
export const setWeatherWeek = (newArrayWeek) => ({ type: SET_WEATHER_WEEK, newArrayWeek})
export const setCurrentTime = (time) => ({ type: SET_CURRENT_TIME, time })
export const setCurrentDatagraphik = (dataGraphik) => ({ type: SET_CURRENT_DATA_GRAPHIK, dataGraphik })
export const setCurrentTimeZone = (timeZone) => ({ type: SET_CURRENT_TIME_ZONE, timeZone })
export const setActiveId = (setActiveId) => ({ type: SET_ACTIVE, setActiveId })
export const toggleFetching = (fetching) => ({ type: TOGGLE_FETCHING, fetching: fetching })

export const getLocationTrunk = (city) => {
    return (dispatch) => {
        dispatch(toggleFetching(true))
        weatherAPIdata.getLocation(city).then(data => {
            dispatch(setLocation(data[0].name, data[0].country, data[0].lat, data[0].lon))
            weatherAPIdata.getWeatherData(data[0].lat, data[0].lon).then(data => {
                const currentDate = new Date(data.current.dt)
                const currentLongDate = new Intl.DateTimeFormat("ru", {dateStyle: "long"}).format(currentDate);
                let rain = 0
                if (data.current.rain) {
                    rain = data.current.rain['1h']
                }
                console.log(data.current.weather[0].description)
                dispatch(setWeatherCurrent(currentLongDate,
                    data.current.feels_like,
                    data.current.humidity,
                    rain,
                    data.current.weather[0].icon,
                    data.current.temp,
                    data.current.weather[0].description,
                    data.current.wind_speed))

                let arrayWeek = data.daily.map((e,i) => {
                    const date = new Date(e.dt*1000)
                    const longDate = new Intl.DateTimeFormat("ru", {dateStyle: "long"}).format(date);
                    return {
                        id: i,
                        dt: longDate.slice(0,-8),
                        temp: e.temp.day,
                        icon: e.weather[0].icon,
                        description: e.weather[0].description,
                    }
                })
                arrayWeek=arrayWeek.slice(0,-2) 
                dispatch(setWeatherWeek(arrayWeek))
            })
            weatherAPIdata.getWeatherDataToGraphik(data[0].lat, data[0].lon).then(data => {

                const massTemp = []
                const massData = []
                data.list.forEach(element => {
                    massData.push(element.dt_txt.slice(-8, -3))
                    massTemp.push(element.main.temp)
                });

                const resMassData = [];
                const resMassTemp = [];
                const chunkSize = 8

                for (let i = 0; i < massTemp.length; i += chunkSize) {
                    const chunk1 = massTemp.slice(i, i + chunkSize);
                    const chunk2 = massData.slice(i, i + chunkSize);
                    resMassTemp.push(chunk1);
                    resMassData.push(chunk2);
                }
                dispatch(setWeatherHorly(resMassTemp, resMassData))
                dispatch(setCurrentDatagraphik(0))
                dispatch(setCurrentTimeZone(data.city.timezone))
                dispatch(toggleFetching(false))
            })
        })
    }
}