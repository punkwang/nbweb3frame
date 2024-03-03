import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export declare type RuleCallback<T> = (object: any, property: string, value: T) => boolean

export function Rule<T>(validatorCallback: RuleCallback<T>, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'Rule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validatorCallback],
            options: {
                ...validationOptions,
                message: `${propertyName} validator error`
            },
            validator: {
                validate(value: T, args: ValidationArguments) {
                    return validatorCallback.apply(args.object, [args.object, args.property, args.value]);
                },
            },
        });
    }
}