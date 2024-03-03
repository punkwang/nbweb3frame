import {Model, Decimal128} from "mongoose";
import {Decimal} from 'decimal.js';

export class MongoHelper {
    public static changeCollection(model: Model<any>, collection: string) {
        return model.db.model(collection, model.schema);
    }

    public static parsePropDecimal(value: Decimal128) {
        if (typeof value !== 'undefined') {
            return new Decimal(value.toString());
        }
        return value;
    }
}