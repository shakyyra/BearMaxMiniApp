import { useMemo } from "react";
import { FORM_SCHEMAS } from "../../config/formSchemas";
import { DynamicForm } from "../DynamicForm";
import { FieldConfig, FormValues } from "../../types/forms";

interface MentoringDetailsScreenProps {
  cityOptions: { value: string; label: string }[];
  educationOptions: { value: string; label: string }[];
  onSubmit: (values: FormValues) => void | Promise<void>;
  extraFields?: FieldConfig[];
}

export function MentoringDetailsScreen({
  cityOptions,
  educationOptions,
  onSubmit,
  extraFields = [],
}: MentoringDetailsScreenProps) {
  const formStep = useMemo(() => {
    const template = FORM_SCHEMAS.mentoring.steps[0];
    const mappedFields = template.fields.map((field) => {
      if (field.name === "city") {
        return { ...field, options: cityOptions };
      }
      if (field.name === "education") {
        return { ...field, options: educationOptions };
      }
      return field;
    });

    const mergedFields = extraFields.length
      ? [...extraFields, ...mappedFields]
      : mappedFields;

    return {
      ...template,
      fields: mergedFields,
    };
  }, [cityOptions, educationOptions, extraFields]);

  return <DynamicForm step={formStep} onSubmit={onSubmit} />;
}
