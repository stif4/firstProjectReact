import React from "react";
import style from './chart.module.css'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, Title);

export const Chart = (props)=>{
    return (
        <div className={style.wrapperLine}>
        <div className={style.line}>
            <Line
                datasetIdKey='id'
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Weather Chart',
                            color: 'white',
                            font: {
                                size: 20
                            }
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                color: "red"
                            },
                            ticks:{
                                color:'white',
                                font:{
                                    size: 14
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: true
                            },
                            ticks:{
                                color:'white',
                                font:{
                                    size: 14
                                }
                            }
                        },
                    },                   
                }}
                data={{
                    labels: props.currentMassData,
                    datasets: [
                        {
                            id: 1,
                            data: props.currentMassTemp,
                            fill: true,
                            backgroundColor: 'rgba(219, 58, 0, 0.1)',
                            borderColor: 'rgba(219, 58, 0, 0.9)',
                        },
                    ],
                }}
            />
        </div>
    </div>
    )
}