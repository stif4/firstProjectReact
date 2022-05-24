import './App.css';
import ChartContainer from './elements/chart/chartContainer';
import MainWeatherContainer from './elements/mainWeather/mainWeatherContainer';
import SearchContainer from './elements/search/searchContainer';
import TimeClass from './elements/time/timeClass';
import WeekWeatherContainer from './elements/weekWeather/weekWeatherContainer';
import Loader from './elements/common/Loader'
import { connect } from 'react-redux';
import React from 'react';

const App = (props) => {
    return (
      <div className="App">
        <div className="wrapper">
          <main className="page">
            <div className="page__container">
              <div className="content">
                <div className="content__section1">
                  <SearchContainer />
                  <TimeClass />
                </div>
                {props.isFetching ? <Loader /> :
                  <><MainWeatherContainer />
                    <WeekWeatherContainer />
                    <ChartContainer /></>}
              </div>
            </div>
          </main>
        </div>
      </div >
    );
}
export default App;
