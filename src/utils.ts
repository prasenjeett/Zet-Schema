import { ZetType } from './schemas/base';

export type infer<T extends ZetType<any>> = T extends ZetType<any, infer O> ? O : never;

export function assertType<T extends ZetType<any>>(
  _schema: T,
  _value: infer<T>
): void {}
