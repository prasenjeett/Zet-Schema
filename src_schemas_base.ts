import { ValidationResult, AsyncValidationResult, ZetTypeOptions } from '../types';
import { ZetError } from '../errors';

export abstract class ZetType<Input, Output = Input> {
  protected options: ZetTypeOptions;

  constructor(options: ZetTypeOptions = {}) {
    this.options = {
      required: true,
      nullable: false,
      ...options
    };
  }

  abstract _parse(input: unknown): ValidationResult<Output> | AsyncValidationResult<Output>;

  async parseAsync(input: unknown): Promise<Output> {
    const result = await Promise.resolve(this._parse(input));
    if (!result.success) {
      throw new ZetError(result.error!.issues);
    }
    return result.data as Output;
  }

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

  safeParse(input: unknown): ValidationResult<Output> {
    const result = this._parse(input);
    if (result instanceof Promise) {
      throw new Error("Async parser used with sync parse");
    }
    return result;
  }

  optional(): ZetType<Input | undefined, Output | undefined> {
    return new ZetOptional(this);
  }

  nullable(): ZetType<Input | null, Output | null> {
    return new ZetNullable(this);
  }

  default(value: Output): ZetType<Input | undefined, Output> {
    return new ZetDefault(this, value);
  }

  describe(description: string): this {
    this.options.description = description;
    return this;
  }
}