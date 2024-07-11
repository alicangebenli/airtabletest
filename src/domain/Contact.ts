export default class Contact {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public phone: string
    ) {
    }

    public get fullName() {
        return this.name + ' ' + this.surname
    }
}