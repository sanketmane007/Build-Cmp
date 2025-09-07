import { LightningElement, api, track } from 'lwc';
import updateComment from '@salesforce/apex/inv_PostController.updateComment';
export default class InvCommentItem extends LightningElement {
    @api comment;
    @track viewMode = true;
    @track content;

    connectedCallback(){
        this.content = this.comment.Content__c ? this.comment.Content__c : "Not value";
    }
    handleContentChange(event) {
        this.content = event.target.value;
    }
    handleEdit() {
        this.viewMode = false;
    }
    handleSave() {

        updateComment({ commentId: this.comment.Id, content: this.content })
            .then(result => {
                console.log('result ===>>' + result);
                this.viewMode = true;
                 const messageData = {
                         message: "Comment Updated Successfully",
                         theme: "success",
                         label: "Success!"
                    };
                    this.alertMethod(messageData);
            })
            .catch(error => {
                 const messageData = {
                         message: error.getMessage(),
                         theme: "Error",
                         label: "Error!"
                    };
                    this.alertMethod(messageData);
                    console.log('error ===>>' + JSON.stringify(error));
            })
    }
    handleCancel(){
          this.viewMode = true;
     }

     //== Show Alert Message based on Result like Toast message
     alertMethod(messageData) {
          const childComponent = this.template.querySelector('c-inv-alert-component');
          if (childComponent) {
               childComponent.handleAlertClick(messageData); // Call the child's method
          }
     }
}