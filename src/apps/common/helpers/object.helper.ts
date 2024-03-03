export class ObjectHelper {
    static valueOf<T>(o: object): T[] {
        const r: T[] = [];
        for (const key in o) {
            r.push(o[key] as T);
        }
        return r;
    }

    static itemByKey<T>(items: T[], keyName): any {
        const r = {};
        for (const item of items) {
            r[item[keyName]] = item;
        }

        return r;
    }

    static enumKeys(e: any): string[] {
        return Object.keys(e).filter(((v) => isNaN(Number(v))));
    }

    static enumValues<T>(e: any): T[] {
        const keys = Object.keys(e).filter(((v) => isNaN(Number(v))));
        return keys.map(k => e[k]) as T[];
    }

    static valueByKey(o: any, key: string) {
        if (!ObjectHelper.existKey(o, key)) {
            return undefined;
        }
        return o[key];
    }

    static existKey(o: any, key: string): boolean {
        const keys = Object.keys(o);
        return keys.includes(key);
    }

    static keys(items: any[], keyName): any[] {
        const r: any[] = [];
        for (const item of items) {
            r.push(item[keyName]);
        }
        return r;
    }
}