import { LightningElement, api, wire } from 'lwc';
import getComments from '@salesforce/apex/inv_PostController.getComments';

export default class InvCommentList extends LightningElement {
     @api postId;
    comments;
    error;

    @wire(getComments, { postId: '$postId' }) // Assuming getComments wire method is set up
    wiredComments({ error, data }) {
        if (data) {
            this.comments = data;
            this.error = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.comments = undefined;
        }
    }
    
}