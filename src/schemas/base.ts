import { ValidationResult, AsyncValidationResult, ZetTypeOptions } from '../types';
import { ZetError } from '../errors';

export abstract class ZetType<Input = any, Output = Input> {
    protected options: ZetTypeOptions;

    constructor(options: ZetTypeOptions = {}) {
        this.options = {
            required: true,
            nullable: false,
            ...options
        };
    }

    abstract _parse(input: unknown): ValidationResult<Output> | AsyncValidationResult<Output>;

    parse(input: unknown): Output {
        const result = this._parse(input);
        if (result instanceof Promise) {
            throw new Error("Async parser used with sync parse");
        }
        if (!result.success) {
            throw new ZetError(result.error!.issues);
        }
        return result.data as Output;
    }

    async parseAsync(input: unknown): Promise<Output> {
        const result = await Promise.resolve(this._parse(input));
        if (!result.success) {
            throw new ZetError(result.error!.issues);
        }
        return result.data as Output;
    }

    safeParse(input: unknown): ValidationResult<Output> {
        const result = this._parse(input);
        if (result instanceof Promise) {
            throw new Error("Async parser used with sync parse");
        }
        return result;
    }

    async safeParseAsync(input: unknown): Promise<ValidationResult<Output>> {
        return Promise.resolve(this._parse(input));
    }
  }
