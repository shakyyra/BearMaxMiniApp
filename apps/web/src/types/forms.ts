export type FieldType = 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
};

export type FieldConfig<T = string> = {
  name: string;
  type: FieldType;
  placeholder: string;
  validation?: ValidationRule;
  options?: { value: string; label: string }[];
  defaultValue?: T;
  rows?: number;
};

export type FormStep<T extends string = string> = {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  buttonText: string;
  stepId: T;
};

export type FormConfig<T extends string = string> = {
  formId: string;
  steps: FormStep<T>[];
};

export type FormValues = Record<string, string>;

export type FormErrors = Record<string, string>;

export type FormState = {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
};
