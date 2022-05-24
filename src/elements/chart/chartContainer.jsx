import { connect } from "react-redux";
import { Chart } from "./chart";


const mapStateToProps = (state) => {
    return {
        currentMassData: state.weatherPage.currentDataGraphik.currentMassData,
        currentMassTemp: state.weatherPage.currentDataGraphik.currentMassTemp,
    }
}

const ChartContainer = connect(mapStateToProps, {})(Chart)
export default ChartContainer