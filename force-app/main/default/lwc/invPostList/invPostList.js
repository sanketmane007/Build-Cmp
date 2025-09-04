import { LightningElement,api,wire } from 'lwc';
import getPosts from '@salesforce/apex/inv_PostController.getPosts';
export default class InvPostList extends LightningElement {
     posts;


     @wire(getPosts)
    wiredPosts({ error, data }) {
        if (data) {
            this.posts = data;
        } else if (error) {
            console.error(error);
        }
    }
}





