import { LightningElement, api, track } from 'lwc';
import updateComment from '@salesforce/apex/inv_PostController.updateComment';
import userId from '@salesforce/user/Id'; //=== this ise used to check user is Logged in or Not
export default class InvCommentItem extends LightningElement {
    @api comment;
    @track viewMode = true;
    @track content;
    isLoggedIn = false; //=== Check User is Logged in Or not  - Permission


    connectedCallback() {
        if (userId) {
            this.isLoggedIn = true;
        }
        this.content = this.comment.Content__c ? this.comment.Content__c : "Not value";
    }
    handleContentChange(event) {
        this.content = event.target.value;
    }
    handleEdit() {
        if (this.isLoggedIn) {
            this.viewMode = false;
        } else {
            // const siteBaseUrl = window.location.origin;
            // Append the login path
            //const loginUrl = `${siteBaseUrl}/login`;
            // Redirect to login page
            // window.location.href = loginUrl;
            const messageData = {
                message: "Please Login to Edit Comment",// click here to Login " + loginUrl,
                theme: "warning",
                label: "warning!"
            };
            this.alertMethod(messageData);
        }
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
    handleCancel() {
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