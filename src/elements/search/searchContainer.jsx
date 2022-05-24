import { connect } from "react-redux";
import { cangeSearchInput, getLocationTrunk } from "../../store/weather_reducer";
import { Search } from "./search";

const mapStateToProps = (state) => {
    return {
        city: state.weatherPage.location.city,
        searchInput: state.weatherPage.searchInput,
    }
}

const SearchContainer = connect(mapStateToProps,{getLocationTrunk, cangeSearchInput})(Search)
export default SearchContainer