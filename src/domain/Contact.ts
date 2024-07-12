export default class Contact {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: Email,
        public phone: number
    ) {
    }

    public get fullName() {
        return this.name + ' ' + this.surname
    }
}