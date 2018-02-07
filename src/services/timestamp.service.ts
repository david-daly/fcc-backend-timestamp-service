import { Response } from '../utils/Response';

export class TimestampService {
    private timestring: string;
    private timestringType: string;

    constructor(event: any) {
        this.timestring = this.parseTimestring(event);
        this.timestringType = this.getTimestampType(this.timestring);
    }

    public getParsedTimestamp() {
        if (this.timestringType === 'invalid') {
            return {
                natural: null,
                unix: null,
            };
        } else {
            const unixTimestamp = this.getUnixTimestamp();
            const naturalTimestamp = this.getNaturalTimestamp();
            return {
                natural: naturalTimestamp,
                unix: unixTimestamp,
            };
        }
    }

    private getUnixTimestamp() {
        const timestring = parseInt(this.timestring, 10);
        if (this.timestringType === 'unix') {
            return timestring;
        } else {
            const date = new Date();
            date.setTime(timestring * 1000);
            return Date.parse(this.timestring) / 1000;
        }
    }

    private getNaturalTimestamp() {
        enum months {
            January, February, March, April, May, June,
            July, August, September, October, November, December,
        }
        if (this.timestringType === 'natural') {
            return this.timestring;
        } else {
            const timestring = parseInt(this.timestring, 10);
            const parsedDate = new Date(timestring * 1000);
            const month = months[parsedDate.getMonth()];

            return `${month} ${parsedDate.getDay()}, ${parsedDate.getFullYear()}`;
        }
    }

    private parseTimestring(event: any) {
        const timestring = event.pathParameters && event.pathParameters.timestring;
        return decodeURIComponent(timestring);
    }

    private getTimestampType(timestamp) {
        if (parseInt(timestamp, 10) >= -8640000000000 && parseInt(timestamp, 10) <= 8640000000000) {
            return 'unix';
        } else if (Date.parse(timestamp)) {
            return 'natural';
        }
        return 'invalid';
    }

}
