export class EmployeeResource {
    id: number;
    internalCode: string;
    firstName: string;
    lastName: string;
    email: string;
    validate: boolean;

    constructor (id: number, internalCode: string, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.internalCode = internalCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}