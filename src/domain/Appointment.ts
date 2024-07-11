import {calculateTimeDifferenceFromNowToNext} from "@/shared/utils/calculateTimeDifferenceFromNowToNext";

export default class Appointment {
    constructor(
        public id: number,
        public date: string,
        public address: string,
        public isCancelled: boolean
    ) {
    }

    public get isTimePassed(): boolean {
        return !calculateTimeDifferenceFromNowToNext(this.date)
    }
}