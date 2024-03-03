import * as moment from "moment-timezone";
import {isNumber} from "lodash";

export interface ParseTimeInfo {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
}

export type RangeType = ('day' | 'month' | 'week')

export class MomentHelper {
    public static Timezone = 'Etc/UTC'
    public static DayOfTime = 86400;
    public static WeekOfTime = 86400 * 7;
    public static HourOfTime = 3600;
    public static MinuteOfTime = 60;

    public static date(format: string = null, time: number = 0): string {
        format = format == null ? 'YYYY-MM-DD HH:mm:ss' : format;
        time = time === 0 ? moment.now() / 1000 : time;
        return moment.unix(time).tz(MomentHelper.Timezone).format(format);
    }

    public static mktime(hour: number = null, minute: number = null, second: number = null, month: number = null, day: number = null, year: number = null): number {

        year = year == null ? MomentHelper.getYear() : year;
        month = month == null ? MomentHelper.getMonth() : month;
        day = day == null ? MomentHelper.getDay() : day;
        hour = hour == null ? MomentHelper.getHour() : hour;
        minute = minute == null ? MomentHelper.getMinute() : minute;
        second = second == null ? MomentHelper.getSecond() : second;

        return moment.tz({
            year, month, day, hour, minute, second,
        }, MomentHelper.Timezone).unix();
    }

    public static strtotime(date_string: string): number {
        return moment.tz(date_string, MomentHelper.Timezone).unix();
    }


    public static time(): number {
        return moment.tz(MomentHelper.Timezone).unix();
    }

    public static getYear(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).year();
    }

    public static getSecond(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).second();
    }

    public static getMinute(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).minute();
    }

    public static getHour(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).hour();
    }

    public static getDay(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).date();
    }

    public static getMonth(last: number = 0): number {
        last = last > 0 ? last : MomentHelper.time();
        return moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone).month();
    }

    public static timeInfo(last: number = 0): ParseTimeInfo {
        last = last > 0 ? last : MomentHelper.time();
        const info = moment.tz(MomentHelper.date('YYYY-MM-DD HH:mm:ss', last), MomentHelper.Timezone);
        return {
            year: info.year(),
            month: info.month(),
            day: info.date(),
            hour: info.hour(),
            minute: info.minute(),
            second: info.second(),
        }
    }

    public static timeBegin(last: number, range: number): number {
        return last - last % range;
    }

    public static weekBegin(last: number = 0): number {
        return moment.tz(MomentHelper.date(null, last), MomentHelper.Timezone).startOf('week').unix()+MomentHelper.DayOfTime;
    }

    public static weekEnd(last: number = 0): number {
        return moment.tz(MomentHelper.date(null, last), MomentHelper.Timezone).endOf('week').unix()+MomentHelper.DayOfTime;
    }

    public static monthBegin(last: number = 0): number {
        return moment.tz(MomentHelper.date(null, last), MomentHelper.Timezone).startOf('month').unix();
    }

    public static monthEnd(last: number = 0): number {
        return moment.tz(MomentHelper.date(null, last), MomentHelper.Timezone).endOf('month').unix();
    }

    public static dayBegin(last: number = 0): number {
        const lastDateString = MomentHelper.date("YYYY-MM-DD", last);
        return MomentHelper.strtotime(lastDateString);
    }

    public static dayEnd(last: number): number {
        const dayBeginTime = MomentHelper.dayBegin(last);
        return dayBeginTime + MomentHelper.DayOfTime - 1;
    }

    public static betweenRange(begin: number, end: number, type: number | RangeType): number[] {
        const result = [];
        let begin_start, end_start, time;
        if (isNumber(type)) {
            // @ts-ignore
            begin_start = begin - begin % type;
            // @ts-ignore
            end_start = end - end % type;
            time = begin_start;
            while (time <= end_start) {
                result.push(time);
                time += type;
            }
            return result;
        } else {
            switch (type) {
                case "day":
                    begin_start = MomentHelper.dayBegin(begin);
                    end_start = MomentHelper.dayBegin(end);
                    time = begin_start;
                    while (time <= end_start) {
                        result.push(time);
                        time += MomentHelper.DayOfTime;
                    }
                    return result;
                case "week":
                    begin_start = MomentHelper.weekBegin(begin);
                    end_start = MomentHelper.weekBegin(end);
                    console.log([
                        MomentHelper.date(null, begin_start),
                        MomentHelper.date(null, end_start),
                    ])
                    time = begin_start;
                    while (time <= end_start) {
                        result.push(time);
                        time += MomentHelper.WeekOfTime;
                    }
                    return result;
                case "month":
                    begin_start = MomentHelper.monthBegin(begin);
                    end_start = MomentHelper.monthBegin(end);
                    time = begin_start;
                    while (time <= end_start) {
                        result.push(time);
                        time = moment.tz(MomentHelper.date(null, time), MomentHelper.Timezone).add(1, 'months').unix();
                    }
                    return result;
            }
        }
    }

    public static betweenRangeCount(begin: number, end: number, type: number | RangeType): number {
        if (isNumber(type)) {
            // @ts-ignore
            const begin_start = begin - begin % type;
            // @ts-ignore
            const end_start = end - end % type;
            // @ts-ignore
            return (end_start - begin_start) / type;
        }
        switch (type) {
            case 'day':
                return moment.tz(MomentHelper.date(null, end), MomentHelper.Timezone).diff(MomentHelper.date(null, begin), 'days') + 1;
            case 'week':
                return moment.tz(MomentHelper.date(null, end), MomentHelper.Timezone).diff(MomentHelper.date(null, begin), 'weeks') + 1;
            case 'month':
                return moment.tz(MomentHelper.date(null, end), MomentHelper.Timezone).diff(MomentHelper.date(null, begin), 'months') + 1;
        }

        return 0;
    }
}