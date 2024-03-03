import {keyBy} from "lodash";

export class ArrayHelper {
    public static keyBy(array: any[], key: any) {
        return keyBy(array, key);
    }
}