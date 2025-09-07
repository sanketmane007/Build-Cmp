import { LightningElement, api, track } from 'lwc';

export default class InvgalaxySpinner extends LightningElement {

    @api isSpinning = false;
    @track star1Style = '';
    @track star2Style = '';
    @track star3Style = '';

    connectedCallback() {
        this.applyRandomColors();
    }

    applyRandomColors() {
        const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
        this.star1Style = `background-color: ${this.getRandomColor(colors)}`;
        this.star2Style = `background-color: ${this.getRandomColor(colors)}`;
        this.star3Style = `background-color: ${this.getRandomColor(colors)}`;
    }

    getRandomColor(colorsArray) {
        return colorsArray[Math.floor(Math.random() * colorsArray.length)];
    }

}