import {Inject} from "@nestjs/common";

export * from './web'

export const injectCls = (cls: Function, targetCls: any) => {
    const clsInject = Inject(cls);
    const clsName = 'inject' + cls.name
    clsInject(targetCls, clsName);
}

export const env = (key: string, defaultVal: any = null, filter: Function = null) => {
    let data = defaultVal;
    if (key in process.env) {
        data = process.env[key];
    }
    if (filter) {
        return filter(data);
    }
    return data;
}