public with sharing class Inv_ImageController {
    
    @AuraEnabled(cacheable=true)
    public static List<Image__c> getImages(String Source, String Display_Name,String Variable) {
        // Query to get the images' URLs
        return [SELECT Id, Name,Display_Name__c, URL__c FROM Image__c 
                WHERE Source__c =: Source AND
                 Display_Name__c =: Display_Name AND 
                 Variable__c =: Variable
                 ];
    }


}