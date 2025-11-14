import { useMemo } from "react";
import { FORM_SCHEMAS } from "../../config/formSchemas";
import { DynamicForm } from "../DynamicForm";
import { FormValues } from "../../types/forms";

interface MentoringDetailsScreenProps {
  cityOptions: { value: string; label: string }[];
  educationOptions: { value: string; label: string }[];
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function MentoringDetailsScreen({
  cityOptions,
  educationOptions,
  onSubmit,
}: MentoringDetailsScreenProps) {
  const formStep = useMemo(() => {
    const template = FORM_SCHEMAS.mentoring.steps[1];
    return {
      ...template,
      fields: template.fields.map((field) => {
        if (field.name === "city") {
          return { ...field, options: cityOptions };
        }
        if (field.name === "education") {
          return { ...field, options: educationOptions };
        }
        return field;
      }),
    };
  }, [cityOptions, educationOptions]);

  return <DynamicForm step={formStep} onSubmit={onSubmit} />;
}
