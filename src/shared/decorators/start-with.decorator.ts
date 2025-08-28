import {registerDecorator, ValidationArguments, type ValidationOptions} from "class-validator";

export function StartWith(prefix: string, options?: ValidationOptions) {
    return (object: Object, propertyKey: string) => {
        registerDecorator({
            name: 'startWith',
            target: object.constructor,
            propertyName: propertyKey,
            constraints: [prefix],
            options: options,
            validator: {
                validate(value: string) {
                    return value.startsWith(prefix);
                },
                defaultMessage(validationArguments?: ValidationArguments): string {
                    return 'Must start with ' + prefix;
                }
            }
        })
    }
}
