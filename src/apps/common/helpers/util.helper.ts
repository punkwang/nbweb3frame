const md5 = require('md5')
import {floor} from "lodash";
import * as moment from "moment-timezone";
import {v4 as uuidv4} from 'uuid';

export class UtilHelper {
    private static _TIME_STEP_ITEMS: Record<string, any> = {};

    static fixed(number) {
        let m = number.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return number.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    }

    static now(timezone = 'Asia/Shanghai') {
        return moment.tz(timezone).unix();
    }

    static async timeStep(key, time, callback) {
        const now = UtilHelper.now();
        if (!UtilHelper._TIME_STEP_ITEMS[key]) {
            UtilHelper._TIME_STEP_ITEMS[key] = {
                last: 0
            }
        }

        if ((now - UtilHelper._TIME_STEP_ITEMS[key].last) < time) {
            return;
        }
        UtilHelper._TIME_STEP_ITEMS[key].last = now;
        await callback();
    }

    static async wait(breakCallback) {
        while (!await breakCallback()) {
            await UtilHelper.sleep(1000);
        }
    }

    static sleep(time) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    }

    static md5(data) {
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        return md5(data);
    }

    static uuid() {
        return uuidv4();
    }


    static repeatItems(o, count) {
        let r = [];
        for (let i = 0; i < count; i++) {
            r.push(o);
        }
        return r;
    }

    static decimal(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    static parseDecimal(value) {
        if (Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    }
}