import { Component } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    data: "",
    isLoading: true,
    city: "",
    errorMessage: "",
  };

  updateCity = (event) => {
    this.setState({ city: event.target.value });
  };

  searchData = async () => {
    const { city, data, isLoading } = this.state;
    const citydata = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=21d6e9bafa2c718f1a66dc8e89ceacb4`
    );
    const fetchedData = await citydata.json();
    this.setState({ data: fetchedData, isLoading: false });
    console.log(fetchedData);
  };

  render() {
    const { isLoading, data, errorMessage } = this.state;
    return (
      <div className="weather-app">
        <h1>Weather app</h1>
        <input
          className="form-control w-50"
          placeholder="search city..."
          onChange={this.updateCity}
          value={this.state.city}
        />
        <button className="btn btn-primary mt-3" onClick={this.searchData}>
          Search
        </button>
        {isLoading == false ? (
          <div className="weather-details">
            <h5>City: {data.name}</h5>
            <p>Weather: {data.weather[0].main}</p>
            <p>wind Speed: {data.wind.speed}</p>
            <p>Current Temperature: {data.main.temp}</p>
            <p>Humidity: {data.main.humidity}</p>
          </div>
        ) : (
          <h2>{errorMessage}</h2>
        )}
      </div>
    );
  }
}
export default App;
