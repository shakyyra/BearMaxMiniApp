import { FORM_SCHEMAS } from "../../config/formSchemas";
import { DynamicForm } from "../DynamicForm";
import { FormValues } from "../../types/forms";

interface MasterclassFormScreenProps {
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function MasterclassFormScreen({ onSubmit }: MasterclassFormScreenProps) {
  const formStep = FORM_SCHEMAS.masterclass.steps[0];

  return <DynamicForm step={formStep} onSubmit={onSubmit} />;
}
