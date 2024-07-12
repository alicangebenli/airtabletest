import {calculateTimeDifferenceFromNowToNext} from "@/shared/utils/calculateTimeDifferenceFromNowToNext";

export default class Appointment {
    constructor(
        public id: string,
        public date: DateTimeIsoString,
        public address: string,
        public isCancelled: boolean
    ) {
    }

    public get isTimePassed(): boolean {
        return !calculateTimeDifferenceFromNowToNext(this.date)
    }

    public get isCompleted() {
        return this.isTimePassed && !this.isCancelled;
    }

    public get isUpcoming() {
        return !this.isTimePassed && !this.isCancelled;
    }

    public get getTime(): number {
        return new Date(this.date).getTime();
    }
}