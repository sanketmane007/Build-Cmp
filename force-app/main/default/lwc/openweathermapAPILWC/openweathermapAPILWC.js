import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWeatherAPI from '@salesforce/apex/openweathermapAPIController.getWeatherData';

export default class OpenweathermapAPILWC extends LightningElement {

    @track changeCityName = 'Austria';// = 'Mumbai';
    @track weatherData = {};
    handleCityChange(event) {
        this.changeCityName = event.target.value;
        console.log('this.changeCityName ===>>' + this.changeCityName);
    }


    displayToastMessage(message, variant) {
        this.showToast(message, variant);
    }
    showToast(message, variant) {
        const evt = new ShowToastEvent({
            title: variant === 'error' ? 'Error' : 'Info',
            message: message,
            variant: variant || 'info', // Supports 'info', 'success', 'warning', 'error'
            mode: 'dismissable' // 'dismissable', 'pester', 'sticky'
        });
        this.dispatchEvent(evt);
    }

    extractWeatherData(data) {
        // Extracting and storing individual values
       // this.weatherData = {
            //city: this.changeCityName || '',
            // iconURL: data.weather[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '',
            // mail: data.weather[0].main || 0,
            // country: data.sys.country || 0,
            // temperature: data.main.temp || 0,
            // feelsLike: data.main.feels_like || 0,
            // pressure: data.main.pressure || 0,
            // description: data.weather[0].description || '',
            // humidity: data.main.humidity || 0,
            // windSpeed: data.wind.speed || 0,
            // visibility: data.visibility || 0,
            // cloudiness: data.clouds.all || 0,
            // windDirection: data.wind.deg || 0,
            // cod: data.cod,
            // message : data.message || ''
             
        // Initialize weather data with defaults
     this.weatherData = {
         iconURL: data?.weather?.[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '',         
        mail: data?.weather?.[0]?.main ||  '',
        country: data?.sys?.country || '',
        temperature: data?.main?.temp || 0,
        feelsLike: data?.main?.feels_like || 0,
        pressure: data?.main?.pressure || 0,
        description: data?.weather?.[0]?.description || '',
        humidity: data?.main?.humidity || 0,
        windSpeed: data?.wind?.speed || 0,
        visibility: data?.visibility || 0,
        cloudiness: data?.clouds?.all || 0,
        windDirection: data?.wind?.deg || 0,
        cod: data?.cod ?? 0,
        message: data?.message || this.weatherData?.message || ''
    };
    
    }

    // Spinner Waiting method
    @track isSpinning;

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startSpinner() {
        this.isSpinning = !this.isSpinning;
    }
    getWeatherData() {

        this.startSpinner();
        this.wait(10000).then(() => {
            console.log('Wait is over!');
        }).catch(error => {
            console.error('Error in wait:', error);
        });

        if (!this.changeCityName || this.changeCityName.trim() === '') {
            this.displayToastMessage('Please enter a city name.', 'info');
            this.startSpinner();
            return;
        }

         getWeatherAPI({ cityName:this.changeCityName })
            .then(response => {
                const parsedResponse = JSON.parse(response);

                // Handle success response
                if (parsedResponse.cod === 200) {
                     console.log('this.parsedResponse ===>>' + JSON.stringify(parsedResponse));
                    this.extractWeatherData(parsedResponse);
                    console.log('this.weatherData ===>>' + JSON.stringify(this.weatherData));
                    this.startSpinner();
                } else {
                    console.log('else - parsedResponse ===>>' + JSON.stringify(parsedResponse));
                      
                     this.extractWeatherData(parsedResponse);
                    this.startSpinner();
                   
                }
            })
            .catch(error => {
                this.startSpinner();
                // Handle unexpected errors
                this.weatherData = undefined;
                console.error('Error fetching weather data:', JSON.stringify(error));
            });
    }
    }





