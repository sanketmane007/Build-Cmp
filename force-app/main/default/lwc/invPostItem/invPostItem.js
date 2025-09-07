import { LightningElement, api, track } from 'lwc';
import updatePost from '@salesforce/apex/inv_PostController.updatePost'
import userId from '@salesforce/user/Id'; //=== this ise used to check user is Logged in or Not
export default class InvPostItem extends LightningElement {
     @api post;
     viewMode = true;
     @track content;
     commentView;
     UserName;
     createdDateAndTime;
     @track isSpinning;
     isLoggedIn = false; //=== Check User is Logged in Or not  - Permission
     //== wait some time


     
     wait(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
     }
     //Spinner Method
     startSpinner() {
          this.isSpinning = !this.isSpinning;
     }

     connectedCallback() {
          if (userId) {
               this.isLoggedIn = true;
          }
          this.content = this.post.Content__c || " ";
          this.UserName = this.post.User__r.FirstName + " " + this.post.User__r.LastName;
          this.formatDateTime(this.post.CreatedDate);
     }

     formatDateTime(apexDateTime) {
          const dateObject = new Date(apexDateTime);
          this.createdDateAndTime = dateObject.toLocaleString();
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
              // const loginUrl = `${siteBaseUrl}/login`;
               // Redirect to login page
               // window.location.href = loginUrl;
               const messageData = {
                    message: "Please Login to Edit Post,", //Here is the login URL: " + loginUrl,
                    theme: "warning",
                    label: "warning!"
               };
               this.alertMethod(messageData);
          }
     }

     handleCancel() {
          this.viewMode = true;
     }
     handleCommentView() {
          this.commentView = true;
     }


     @track message = 'Click the button to start wait.';
     handleSave() {
          this.startSpinner();
          this.wait(10000).then(() => {
               this.message = 'Wait is over!';
          }).catch(error => {
               console.error('Error in wait:', error);
          });



          updatePost({ postId: this.post.Id, content: this.content })
               .then(result => {
                    console.log('result ===>>' + result);
                    this.viewMode = true;
                    this.startSpinner();
                    const messageData = {
                         message: "Post Updated Successfully",
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

     //  Show Alert COmponent like Show Toas Message
     alertMethod(messageData) {
          const childComponent = this.template.querySelector('c-inv-alert-component');
          if (childComponent) {
               childComponent.handleAlertClick(messageData); // Call the child's method
          }
     }
}