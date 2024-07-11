export default class Appointment {
    constructor(
        public id: number,
        public date: string,
        public address: string,
        public is_cancelled: boolean
    ) {
    }
}