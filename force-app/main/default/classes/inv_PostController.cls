public with sharing class inv_PostController {
    @AuraEnabled(cacheable=true)
    public static List<Post__c> getPosts() {
        // Fetch all posts along with related comments
        return [SELECT Id, Title__c, Content__c,
                    (SELECT Id, Content__c, CreatedById
                    FROM Comments__r)
            FROM Post__c ORDER BY Created_At__c DESC LIMIT 30];
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<Comment__c> getComments(String postId){
        return [SELECT Id,Comment_Id__c,Name,Content__c,
                Post__c FROM Comment__c WHERE Post__c =: postId LIMIT 30];
    }
    
    @AuraEnabled
    public static String updatePost(String postId,String content){
        Post__c ps = new Post__c();
        ps.Content__c = content;
        ps.Id = postId;
        update ps;
        return 'success';
    }
    @AuraEnabled
    public static String updateComment(String commentId,String content){
        Comment__c comm = new Comment__c();
        comm.Content__c = content;
        comm.Id = commentId;
        update comm;
        return 'success';
    }
}