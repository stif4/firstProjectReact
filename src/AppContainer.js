import { connect } from "react-redux";
import App from "./App";

const mapStateToProps = (state) => {
    return {
      isFetching: state.weatherPage.isFetching
    }
  }
const AppContainder = connect(mapStateToProps,{})(App)
export default AppContainder;