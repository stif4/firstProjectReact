import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import { weatherPage } from "./weather_reducer";

let reducers = combineReducers({
    weatherPage: weatherPage
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store