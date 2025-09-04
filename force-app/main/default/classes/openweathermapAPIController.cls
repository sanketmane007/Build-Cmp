public with sharing class openweathermapAPIController {
    @AuraEnabled   
    public static String getWeatherData(String cityName){

        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:openweathermap/weather?q='+cityName+'&appid='+System.Label.appid+'&units=metric');
        HttpResponse res = http.send(request);
        return res.getBody();

    }

}