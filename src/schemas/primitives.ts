import { ZetType } from './base';
import { ValidationResult } from '../types';

export class ZetString extends ZetType<string> {
  _parse(input: unknown): ValidationResult<string> {
    if (typeof input !== 'string') {
      return {
        success: false,
        error: {
          issues: [{
            code: 'invalid_type',
            expected: 'string',
            received: typeof input,
            path: [],
            message: `Expected string, received ${typeof input}`
          }]
        }
      };
    }
    return { success: true, data: input };
  }

  email(message?: string) {
    return this.refine(
      (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val),
      message || 'Invalid email address'
    );
  }

  min(length: number, message?: string) {
    return this.refine(
      (val) => val.length >= length,
      message || `String must be at least ${length} characters`
    );
  }

  max(length: number, message?: string) {
    return this.refine(
      (val) => val.length <= length,
      message || `String must be at most ${length} characters`
    );
  }
}

export class ZetNumber extends ZetType<number> {
  _parse(input: unknown): ValidationResult<number> {
    if (typeof input !== 'number' || isNaN(input)) {
      return {
        success: false,
        error: {
          issues: [{
            code: 'invalid_type',
            expected: 'number',
            received: typeof input,
            path: [],
            message: `Expected number, received ${typeof input}`
          }]
        }
      };
    }
    return { success: true, data: input };
  }

  min(value: number, message?: string) {
    return this.refine(
      (val) => val >= value,
      message || `Number must be greater than or equal to ${value}`
    );
  }

  max(value: number, message?: string) {
    return this.refine(
      (val) => val <= value,
      message || `Number must be less than or equal to ${value}`
    );
  }
}
