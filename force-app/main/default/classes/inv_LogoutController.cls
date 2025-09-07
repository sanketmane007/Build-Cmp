public with sharing class inv_LogoutController {
    
      @AuraEnabled
    public static String getLogoutUrl() {
        // Return the logout URL specific to your Experience Cloud site
        // Update with your Experience Cloud site domain
        String communityDomain = Url.getOrgDomainUrl().toExternalForm();
        String logoutUrl = communityDomain + '/secur/logout.jsp';
        return logoutUrl;
    }
    
}