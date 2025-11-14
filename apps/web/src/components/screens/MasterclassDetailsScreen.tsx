import { useMemo } from "react";
import { FORM_SCHEMAS } from "../../config/formSchemas";
import { DynamicForm } from "../DynamicForm";
import { FormValues } from "../../types/forms";

interface MasterclassDetailsScreenProps {
  cityOptions: { value: string; label: string }[];
  educationOptions: { value: string; label: string }[];
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function MasterclassDetailsScreen({
  cityOptions,
  educationOptions,
  onSubmit,
}: MasterclassDetailsScreenProps) {
  const formStep = useMemo(() => {
    const template = FORM_SCHEMAS.masterclass.steps[1];
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
