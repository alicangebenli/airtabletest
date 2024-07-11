export default class Agent {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public color?: string,
        public number?: number,
    ) {
    }

    public get fullName() {
        return this.name + ' ' + this.surname
    }
}