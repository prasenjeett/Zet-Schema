export type Primitive = string | number | boolean | null | undefined;

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: ZetError;
};

export type AsyncValidationResult<T> = Promise<ValidationResult<T>>;

export interface ZetTypeOptions {
  required?: boolean;
  nullable?: boolean;
  description?: string;
}

export type ErrorMapContext = {
  defaultError: string;
  data: unknown;
};

export type ZetErrorMap = (
  issue: Omit<ZetIssue, "message">,
  ctx: ErrorMapContext
) => { message: string };

export type ZetIssueCode = 
  | "invalid_type"
  | "required"
  | "invalid_string"
  | "too_small"
  | "too_big"
  | "invalid_enum"
  | "invalid_union"
  | "custom";

export interface ZetIssue {
  code: ZetIssueCode;
  path: (string | number)[];
  message: string;
  expected?: string;
  received?: string;
}
