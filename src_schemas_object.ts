import { ZetType } from './base';
import { ValidationResult } from '../types';

export class ZetObject<T extends Record<string, ZetType<any>>> extends ZetType<{
  [K in keyof T]: T[K] extends ZetType<infer U> ? U : never;
}> {
  private shape: T;

  constructor(shape: T, options = {}) {
    super(options);
    this.shape = shape;
  }

  _parse(input: unknown): ValidationResult<{
    [K in keyof T]: T[K] extends ZetType<infer U> ? U : never;
  }> {
    if (typeof input !== 'object' || input === null) {
      return {
        success: false,
        error: {
          issues: [{
            code: 'invalid_type',
            expected: 'object',
            received: typeof input,
            path: [],
            message: 'Expected object'
          }]
        }
      };
    }

    const result: any = {};
    const errors: any[] = [];

    for (const [key, schema] of Object.entries(this.shape)) {
      const value = (input as any)[key];
      const parseResult = schema._parse(value);

      if (!parseResult.success) {
        errors.push(
          ...parseResult.error!.issues.map(issue => ({
            ...issue,
            path: [key, ...issue.path]
          }))
        );
      } else {
        result[key] = parseResult.data;
      }
    }

    if (errors.length > 0) {
      return {
        success: false,
        error: { issues: errors }
      };
    }

    return { success: true, data: result };
  }

  extend<U extends Record<string, ZetType<any>>>(shape: U) {
    return new ZetObject({ ...this.shape, ...shape });
  }
}