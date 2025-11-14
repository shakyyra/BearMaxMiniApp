import { FieldConfig, FormValues, FormErrors } from '../types/forms';

export function validateField(
  value: string,
  field: FieldConfig
): string | null {
  const { validation } = field;
  
  if (!validation) return null;

  // Required validation
  if (validation.required && !value.trim()) {
    return validation.message || `${field.placeholder} обязательно для заполнения`;
  }

  // Skip other validations if field is empty and not required
  if (!value.trim()) return null;

  // MinLength validation
  if (validation.minLength && value.length < validation.minLength) {
    return validation.message || `Минимум ${validation.minLength} символов`;
  }

  // MaxLength validation
  if (validation.maxLength && value.length > validation.maxLength) {
    return validation.message || `Максимум ${validation.maxLength} символов`;
  }

  // Pattern validation
  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.message || 'Неверный формат';
  }

  return null;
}

export function validateForm(
  values: FormValues,
  fields: FieldConfig[]
): FormErrors {
  const errors: FormErrors = {};

  fields.forEach(field => {
    const error = validateField(values[field.name] || '', field);
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
