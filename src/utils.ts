import { ZetType } from './schemas/base';

export type infer<T extends ZetType<any>> = T extends ZetType<any, infer O> ? O : never;

export function assertType<T extends ZetType<any>>(schema: T, value: infer<T>): void {
    // This function is used only for type checking
    // It doesn't need to do anything at runtime
};

export function createErrorMessage(message: string, path: (string | number)[] = []): string {
    return path.length > 0 ? `${path.join('.')}: ${message}` : message;
};

export const isPromise = (value: unknown): value is Promise<unknown> => {
    return value instanceof Promise;
};

// Type guard for checking if a value is undefined
export const isUndefined = (value: unknown): value is undefined => {
    return value === undefined;
};

// Type guard for checking if a value is null
export const isNull = (value: unknown): value is null => {
    return value === null;
};

// Type guard for checking if a value is nullish (null or undefined)
export const isNullish = (value: unknown): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};
