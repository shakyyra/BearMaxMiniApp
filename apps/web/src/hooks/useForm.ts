import { useState, useCallback } from 'react';
import { FormValues, FormErrors, FormState, FieldConfig } from '../types/forms';
import { validateField, validateForm, hasErrors } from '../utils/validation';

interface UseFormOptions {
  fields: FieldConfig[];
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function useForm({ fields, onSubmit }: UseFormOptions) {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {} as FormValues);

  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const handleChange = useCallback((name: string, value: string) => {
    setState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: '',
      },
    }));
  }, []);

  const handleBlur = useCallback((name: string) => {
    const field = fields.find(f => f.name === name);
    if (!field) return;

    const error = validateField(state.values[name] || '', field);
    
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true,
      },
      errors: {
        ...prev.errors,
        [name]: error || '',
      },
    }));
  }, [fields, state.values]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate all fields
    const errors = validateForm(state.values, fields);
    
    // Mark all fields as touched
    const touched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setState(prev => ({
      ...prev,
      errors,
      touched,
    }));

    // If there are errors, don't submit
    if (hasErrors(errors)) {
      return;
    }

    // Submit form
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await onSubmit(state.values);
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [state.values, fields, onSubmit]);

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
