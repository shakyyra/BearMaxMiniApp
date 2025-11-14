import { motion } from "motion/react";
import { FormStep, FormValues } from "../types/forms";
import { useForm } from "../hooks/useForm";
import { FormField } from "./FormField";

interface DynamicFormProps {
  step: FormStep;
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function DynamicForm({ step, onSubmit }: DynamicFormProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    fields: step.fields,
    onSubmit,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute box-border content-stretch flex flex-col gap-[24px] items-start justify-center left-0 px-[24px] py-0 right-0 top-[287px] pb-[96px]" 
      data-name="Number input"
    >
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Paragraph container">
        <p className="font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2e2e2e] text-[20px] w-full">
          {step.title}
        </p>
        <p className="font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[1.6] relative shrink-0 text-[#787878] text-[13px] w-full">
          {step.subtitle}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Form">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Inputs">
          {step.fields.map(field => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name] || ''}
              error={errors[field.name]}
              touched={touched[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 h-[55px] relative rounded-[15px] shadow-[0px_8px_24px_0px_rgba(79,70,229,0.4)] shrink-0 w-full hover:bg-indigo-700 active:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
          data-name="Button"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[10px] h-[55px] items-center justify-center p-[8px] relative w-full">
              <p className="basis-0 font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold grow h-[33px] leading-[normal] min-h-px min-w-px relative shrink-0 text-[20px] text-center text-white">
                {isSubmitting ? 'Отправка...' : step.buttonText}
              </p>
            </div>
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
}