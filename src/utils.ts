import { ZetType } from './schemas/base';

// Type inference utility type
export type infer<T> = T extends ZetType<any, infer O> ? O : never;

// Type assertion function
export function assertType<T extends ZetType<any>>(schema: T, value: any){
    schema.parse(value);
}

// Error message creator
export function createErrorMessage(message: string, path: (string | number)[] = []): string {
    return path.length > 0 ? `${path.join('.')}: ${message}` : message;
}

// Type guards
export const isPromise = (value: unknown): value is Promise<unknown> => {
    return value instanceof Promise;
};

export const isUndefined = (value: unknown): value is undefined => {
    return typeof value === 'undefined';
};

export const isNull = (value: unknown): value is null => {
    return value === null;
};

export const isNullish = (value: unknown): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};

// Type helper for object shapes
export type Shape = { [k: string]: ZetType<any> };

// Type helper for inferring object type from shape
export type TypeOf<T extends Shape> = {
    [K in keyof T]: T[K] extends ZetType<any, infer U> ? U : never;
};
