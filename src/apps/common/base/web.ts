import {Inject} from "@nestjs/common";
import {SubscribeMessage} from "@nestjs/websockets";

export interface IAction {
    handle(...args: any[]): Promise<any>
}

export interface IGatewayEvent {
    handle(...args: any[]): Promise<any>
}

export const Action = (actionCls: Function, handleName: string = 'handle') => {
    const actionClsInject = Inject(actionCls);
    const actionClsName = 'inject' + actionCls.name;
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        actionClsInject(target, actionClsName);
        descriptor.value = function (...args: any) {
            const service = (this as any)[actionClsName];
            return service[handleName](...args);
        };
        return descriptor;
    }
}

export const GatewayEvent = (eventCls: Function, eventName = null, handleName: string = 'handle') => {
    const eventClsInject = Inject(eventCls);
    const eventClsName = 'inject' + eventCls.name
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (eventName == null) {
            eventName = propertyKey
        }
        eventClsInject(target, eventClsName);
        descriptor.value = async function (...args: any) {
            const service = (this as any)[eventClsName];
            const ret = await service[handleName](...args);
            if (ret?.event != undefined) {
                return ret;
            }
            return {
                event: eventName,
                data: ret
            };
        }
        const subscribeMessageBuild = SubscribeMessage(eventName);
        return subscribeMessageBuild(target, propertyKey, descriptor);
    }
}