import { LightningElement,api,track } from 'lwc';
import updatePost from '@salesforce/apex/inv_PostController.updatePost'
export default class InvPostItem extends LightningElement {
     @api post;
     viewMode = true;
     @track content;

     connectedCallback(){
          this.content = this.post.Content__c ? this.post.Content__c : "Not value";
     }
     handleContentChange(event) {
        this.content = event.target.value;  

     }
     handleEdit(){
          this.viewMode = false;
     }
     handleCancel(){
          this.viewMode = true;
     }

     handleSave(){
          updatePost({postId : this.post.Id, content : this.content})
          .then(result =>{
               console.log('result ===>>'+result);
               this.viewMode = true;
          })
          .catch(error =>{
               console.log('error ===>>'+JSON.stringify(error));
          
          })
     }
}