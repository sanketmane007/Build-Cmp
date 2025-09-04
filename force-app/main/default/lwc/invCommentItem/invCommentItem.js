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
            })
            .catch(error => {
                console.log('error ===>>' + JSON.stringify(error));
            })
    }

}