import {floor, random} from "lodash";
import {Decimal} from "decimal.js";

export class PriceHelper {
    public static randPrice(min, max, precision): number {
        return floor(random(min, max) / Math.pow(10, precision), precision);
    }

    public static fakeFloatingPrice(base_price, base_max_price, base_min_price, floating, precision): Decimal {
        const float_price = floor(base_price * floating, precision);
        const pow = Math.pow(10, precision);
        const rand = PriceHelper.randPrice(-float_price * pow, float_price * pow, precision);
        let price = base_price + rand;
        if (price > base_max_price) price = base_max_price;
        if (price < base_min_price) price = base_min_price;
        return new Decimal(price);
    }

    public static decimal(num: any) {
        return new Decimal(num);
    }

    public static zero(): Decimal {
        return PriceHelper.decimal(0);
    }

    public static followPrice(follow_base_price: Decimal, follow_with_price: Decimal, follow_with_last_price: Decimal, precision: number): Decimal {
        const rate = follow_with_last_price.div(follow_with_price);
        return new Decimal(floor(rate.mul(follow_base_price).toNumber(), precision));
    }

    public static formatNumber(num: number | Decimal): Decimal {
        const new_number = `${num}`.replace(/^([0-9]+[.]{1}[0-9]+?)[0]{4,}[0-9]{1}$/, '$1')
            .replace(/^([0-9]+[.]{1}[0-9]+?)[9]{4,}[0-9]{1}$/, '$1');
        return new Decimal(new_number);
    }
}