public with sharing class openweathermapAPIController {
    @AuraEnabled   
    public static String getWeatherData(String cityName){

        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:openweathermap/weather?q='+cityName+'&appid='+System.Label.appid+'&units=metric');
     //equest.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q=kharghar&appid=b9d62dd4024d5eef52fc8f71c0058de5');
        HttpResponse res = http.send(request);
        return res.getBody();

    }

}