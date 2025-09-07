public without sharing class openweathermapAPIController {
    @AuraEnabled   
    public static String getWeatherData(String cityName){

        // HTTP http = new HTTP();
        // HttpRequest request = new HttpRequest();
        // request.setMethod('GET');
        // request.setEndpoint('callout:openweathermap/weather?q='+cityName+'&appid='+System.Label.appid);
        // HttpResponse res = http.send(request);
        // return res.getBody();


         // Initialize HTTP and request objects
    HTTP http = new HTTP();
    HttpRequest request = new HttpRequest();

    // Set up the request
    request.setMethod('GET');
    
    request.setEndpoint('callout:openweathermap/weather?q='+cityName+'&appid='+System.Label.appid);

    // Send the request and handle the response
    try {
        HttpResponse response = http.send(request);
        
        // System.debug('responce =1==>>>'+response.getBody());
        // System.debug('responce =2==>>>'+response.getStatusCode());
        // System.debug('responce ==3=>>>'+response.getStatus());

        if (response.getStatusCode() == 200) {
            // Deserialize the JSON response into a map for easy access
            Map<String, Object> responseData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            // Check if the cod value is 200 (success)
            if (Integer.valueOf(responseData.get('cod')) == 200) {
                // Successful response with weather data
                return response.getBody();
            } else {
                // Handle error in case cod is not 200
                return 'Error: ' + (String) responseData.get('message');
            }
        } else {
            // HTTP status error handling
            System.debug('HTTP Response Error: ' + response.getStatusCode() + ' - ' + response.getStatus());
            return response.getBody();
        }
        
    } catch (Exception e) {
        // Handle the exception and return the error message
        System.debug('Exception in HTTP request: ' + e.getMessage());
        return e.getMessage();
    }

    }

}