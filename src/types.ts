export type Primitive = string | number | boolean | null | undefined;

export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    error?: ZetError;
}

export type AsyncValidationResult<T> = Promise<ValidationResult<T>>;

export interface ZetTypeOptions {
    required?: boolean;
    nullable?: boolean;
    description?: string;
}

export interface ZetError {
    issues: ZetIssue[];
}

export interface ZetIssue {
    code: ZetIssueCode;
    path: (string | number)[];
    message: string;
    expected?: string;
    received?: string;
}

export type ZetIssueCode = 
    | "invalid_type"
    | "required"
    | "invalid_string"
    | "too_small"
    | "too_big"
    | "invalid_enum"
    | "invalid_union"
    | "custom";
