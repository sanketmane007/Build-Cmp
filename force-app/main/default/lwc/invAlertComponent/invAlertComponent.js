import { LightningElement,track,api } from 'lwc';
import LightningAlert from "lightning/alert";
export default class InvAlertComponent extends LightningElement {
   
    @api async handleAlertClick(messageData) {
       const processedMessage = this.linkify(messageData.message);

    await LightningAlert.open({
      message: messageData.message,
      theme: messageData.theme, // a red theme intended for error states
      label: messageData.label, // this is the header text
    });
    // alert notification has been closed
  }
  linkify(text) {
        // This regex pattern is designed to detect URL patterns in the text
        const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

        // Replace detected URLs with anchor tags
        return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
    }
}