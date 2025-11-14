import { motion } from "motion/react";
import { FieldConfig } from "../types/forms";
import svgPaths from "../imports/form-field-icons";

interface FormFieldProps {
  field: FieldConfig;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
}

export function FormField({ 
  field, 
  value, 
  error, 
  touched, 
  onChange, 
  onBlur 
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field.name, e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(field.name);
    }
  };

  const showError = touched && error;
  const borderColor = showError ? '#EF4444' : '#bcbcbc';

  if (field.type === 'select') {
    return (
      <div className="w-full">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-white relative rounded-[15px] shrink-0 w-full" 
          data-name="Select"
        >
          <div 
            aria-hidden="true" 
            className="absolute border border-solid inset-0 pointer-events-none rounded-[15px]" 
            style={{ borderColor }}
          />
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[20px] relative w-full">
              <select
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="basis-0 font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium grow leading-[1.6] min-h-px min-w-px relative shrink-0 text-[16px] bg-transparent outline-none appearance-none transition-colors"
                style={{ color: value ? '#4b4b4b' : '#a5a5a5' }}
              >
                <option value="" disabled>{field.placeholder}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="relative shrink-0 size-[24px]" data-name="Container">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g id="Container">
                    <path d={svgPaths.p2b02a600} fill="var(--fill-0, #787878)" id="Vector" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        {showError && (
          <p className="text-[#EF4444] text-[12px] mt-1 px-[4px] font-['Plus_Jakarta_Sans:Medium',sans-serif]">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="w-full">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-white h-[139px] relative rounded-[15px] shrink-0 w-full" 
          data-name="Container"
        >
          <div 
            aria-hidden="true" 
            className="absolute border border-solid inset-0 pointer-events-none rounded-[15px]"
            style={{ borderColor }}
          />
          <div className="size-full">
            <div className="box-border content-stretch flex gap-[16px] h-[139px] items-start px-[16px] py-[20px] relative w-full">
              <textarea
                placeholder={field.placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={field.rows || 5}
                className="basis-0 font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium grow leading-[1.6] min-h-px min-w-px relative shrink-0 text-[#4b4b4b] text-[16px] bg-transparent outline-none resize-none placeholder:text-[#a5a5a5] w-full h-full transition-colors"
              />
            </div>
          </div>
        </motion.div>
        {showError && (
          <p className="text-[#EF4444] text-[12px] mt-1 px-[4px] font-['Plus_Jakarta_Sans:Medium',sans-serif]">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Default: text, email, tel, url
  return (
    <div className="w-full">
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-white relative rounded-[15px] shrink-0 w-full" 
        data-name="Container"
      >
        <div 
          aria-hidden="true" 
          className="absolute border border-solid inset-0 pointer-events-none rounded-[15px]"
          style={{ borderColor }}
        />
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[20px] relative w-full">
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="basis-0 font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium grow leading-[1.6] min-h-px min-w-px relative shrink-0 text-[#4b4b4b] text-[16px] bg-transparent border-none outline-none placeholder:text-[#a5a5a5] transition-colors"
            />
          </div>
        </div>
      </motion.div>
      {showError && (
        <p className="text-[#EF4444] text-[12px] mt-1 px-[4px] font-['Plus_Jakarta_Sans:Medium',sans-serif]">
          {error}
        </p>
      )}
    </div>
  );
}
