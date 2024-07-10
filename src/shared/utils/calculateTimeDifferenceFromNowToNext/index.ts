export function calculateTimeDifferenceFromNowToNext(nextDateIsoString: string) {
    let pastDate = new Date(nextDateIsoString);
    let now = new Date();
    let differenceInMillis: number =  pastDate.valueOf() - now.valueOf();
    let differenceInSeconds = Math.floor(differenceInMillis / 1000);
    let differenceInMinutes = Math.floor(differenceInSeconds / 60);
    let differenceInHours = Math.floor(differenceInMinutes / 60);
    let differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
        return {
            type: 'days',
            value: differenceInDays
        }
    } else if (differenceInHours > 0) {
        return {
            type: 'hours',
            value: differenceInHours
        }
    } else if (differenceInMinutes > 0) {
        return {
            type: 'minutes',
            value: differenceInHours
        }
    } else if (differenceInSeconds > 0) {
        return {
            type: 'seconds',
            value: differenceInSeconds
        }
    } else if (differenceInMillis > 0) {
        return {
            type: 'miliseconds',
            value: differenceInMillis
        }
    }

    return false;
}