import { Base } from "./base.js";

export class User extends Base{
    constructor(id, firstName, lastName, email, password ){
        super(id)
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    fullName = () => `${this.firstName} ${this.lastName}`;
}