import { FORM_SCHEMAS } from "../../config/formSchemas";
import { DynamicForm } from "../DynamicForm";
import { FormValues } from "../../types/forms";

interface MentoringFormScreenProps {
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function MentoringFormScreen({ onSubmit }: MentoringFormScreenProps) {
  const formStep = FORM_SCHEMAS.mentoring.steps[0];

  return <DynamicForm step={formStep} onSubmit={onSubmit} />;
}
