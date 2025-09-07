import { LightningElement,track,api } from 'lwc';
import LightningAlert from "lightning/alert";
export default class InvAlertComponent extends LightningElement {
   
    @api async handleAlertClick(messageData) {
    await LightningAlert.open({
      message: messageData.message,
      theme: messageData.theme, // a red theme intended for error states
      label: messageData.label, // this is the header text
    });
    // alert notification has been closed
  }
}