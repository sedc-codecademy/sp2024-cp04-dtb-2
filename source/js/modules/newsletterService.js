export class Newsletter{
    constructor(){
        this.storage = [];
    }
    addNewSubscriber (email){
        if(this.storage.includes(email)) {
            document.getElementById('subscibeModalInfo').style.color= 'red';
            document.getElementById('subscibeModalInfo').innerHTML = "Email already subscribed!"

        }
        else {
            this.storage.push(email)
            document.getElementById('subscibeModalInfo').style.color= 'green';
            document.getElementById('subscibeModalInfo').innerHTML = "Successfully subscribed!"
        };
    }
    removeSubscriber (email){
        const indexOfEmail = this.storage.indexOf(email);
        if (indexOfEmail !== -1) {
            this.storage.splice(indexOfEmail, 1);
        document.getElementById('unsubscibeModalInfo').innerHTML = `Successfully removed ${email}!`;
        }
        else{
        document.getElementById('unsubscibeModalInfo').innerHTML = `Email [${email}] not found!`
        }
    }

}