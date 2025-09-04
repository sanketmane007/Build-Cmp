import { LightningElement,track,wire,api } from 'lwc';
import getWeatherAPI from '@salesforce/apex/openweathermapAPIController.getWeatherData'
export default class OpenweathermapAPILWC extends LightningElement {
    
    @track changeCityName;// = 'Mumbai';
      @track weatherData;

    handleCityChange(event){
        this.changeCityName = event.target.value;
        console.log('this.changeCityName ===>>'+this.changeCityName);
    }
    getWeatherData(){

    getWeatherAPI({cityName : this.changeCityName})
        .then((result)=>{
            console.log('result ===>>'+result);
            this.weatherData = JSON.parse(result);
        })
        .catch(error =>{
            console.log('error ===>>'+JSON.stringify(error))
        })
    }

    // Precompute these values to be used in the template
    get weatherIconUrl() {
        return this.weatherData?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png` : '';
    }

    get weatherDescription() {
        return this.weatherData?.weather[0]?.description || '';
    }

    get weatherMain() {
        return this.weatherData?.weather[0]?.main || '';
    }

    get cityName() {
        return this.weatherData?.name || '';
    }

    get temperature() {
        return this.weatherData?.main.temp || 0;
    }

    get feelsLikeTemperature() {
        return this.weatherData?.main.feels_like || 0;
    }

    get humidity() {
        return this.weatherData?.main.humidity || 0;
    }

    get pressure() {
        return this.weatherData?.main.pressure || 0;
    }

    get visibility() {
        return this.weatherData?.visibility || 0;
    }

    get windSpeed() {
        return this.weatherData?.wind.speed || 0;
    }

    get windDirection() {
        return this.weatherData?.wind.deg || 0;
    }


}