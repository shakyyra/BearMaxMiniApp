import { motion } from "motion/react";
import imgImage1 from "@/assets/onboarding-illustration.png";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white relative w-full h-screen max-w-[428px] mx-auto overflow-hidden flex flex-col" 
      data-name="Onboarding"
    >
      {/* Image Section */}
      <div className="flex-shrink-0 w-full px-6 pt-16 pb-8 flex items-center justify-center">
        <div className="relative w-full max-w-[380px] aspect-[380/253]">
          <img 
            alt="Дети с мишкой" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" 
            src={imgImage1} 
          />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="flex-1 flex flex-col px-6 overflow-auto">
        <div className="content-stretch flex flex-col font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium gap-[12px] items-start leading-[1.6] text-[#4b4b4b] text-[16px]">
          <p className="relative shrink-0 w-full">{`MiniApp MAX «Мишка» создан для помощи детям-сиротам. Их проблемы часто остаются в тени. `}</p>
          <p className="relative shrink-0 w-full">В праздники ребята получают много подарков, но этого не достаточно, чтобы стать взрослым. Они нуждаются в навыках, которые смогут применять в будущем</p>
          <p className="relative shrink-0 w-full">
            Мы создали «Мишку», чтобы осветить проблемы, и больше детей получили помощь.
            <br aria-hidden="true" />
            Ведь сделать это с «Мишкой» просто и эффективно.
          </p>
        </div>
      </div>
      
      {/* Button */}
      <div className="flex-shrink-0 px-6 pb-8 pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="bg-indigo-600 box-border content-stretch flex gap-[10px] h-[55px] items-center justify-center w-full p-[8px] rounded-[15px] shadow-[0px_8px_24px_0px_rgba(79,70,229,0.4)] hover:bg-indigo-700 active:bg-indigo-800 transition-colors" 
          data-name="Button"
        >
          <p className="basis-0 font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold grow h-[33px] leading-[normal] min-h-px min-w-px relative shrink-0 text-[20px] text-center text-white">Помочь детям</p>
        </motion.button>
      </div>
    </motion.div>
  );
}
