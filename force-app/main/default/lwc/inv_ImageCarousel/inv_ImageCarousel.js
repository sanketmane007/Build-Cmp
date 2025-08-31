import { LightningElement,track,wire,api } from 'lwc';
import getImages from '@salesforce/apex/Inv_ImageController.getImages';
export default class Inv_ImageCarousel extends LightningElement {
@track images = [];
@track currentIndex = 0;
@track Source = 'Git';
@track Display_Name = 'Home Page';
@track Variable = 'Slide';

@wire(getImages,{Source : '$Source',  Display_Name : '$Display_Name', Variable : '$Variable'})
wiredImages({ error, data }) {
    if (data) {
       
    this.images = data.map(record => {
                let newRecord; //= { ...record }; // Create a new object to avoid direct mutation
                newRecord = 'https://github.com/sanketmane007/Build-Cmp/blob/Version_1/'+record.URL__c;
                return newRecord;
            });
        console.log('image==>>>>'+JSON.stringify(this.images));

    } else if (error) {
        console.error('error===>>>'+error.getMessage());
    }
}

    connectedCallback() {
        this.startSlideShow();
    }

      startSlideShow() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }, 2000);
    }

    get selectedImage() {
        return this.images.length > 0 ? this.images[this.currentIndex] : '';
    }
}