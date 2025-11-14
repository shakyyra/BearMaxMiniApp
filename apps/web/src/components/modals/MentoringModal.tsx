import { motion, AnimatePresence } from "motion/react";
import imgImage4 from "@/assets/mentoring-illustration.png";

interface MentoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentoringModal({ isOpen, onClose }: MentoringModalProps) {
  const handleButtonClick = () => {
    // This will trigger the form to show
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Darking overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white box-border content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[20px] py-[24px] rounded-[16px] w-[378px] z-50 max-w-[calc(100%-48px)]"
          >
            <div className="h-[225px] relative rounded-[20px] shrink-0 w-full max-w-[338px]" data-name="image 4">
              <img 
                alt="Наставничество" 
                className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" 
                src={imgImage4} 
              />
            </div>
            <p className="font-['Plus_Jakarta_Sans:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[1.6] relative shrink-0 text-[#4b4b4b] text-[16px] w-full max-w-[330px]">
              Детям не хватает своего взрослого и поддержки. Ваше общение и опыт могут изменить его жизнь, помочь с выбором профессии и поверить в себя. Станьте тем, кому он сможет доверять.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleButtonClick}
              className="bg-indigo-600 h-[55px] relative rounded-[15px] shrink-0 w-full hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
              data-name="Button"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[55px] items-center justify-center p-[8px] relative w-full">
                  <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold grow h-[33px] justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[20px] text-center text-white">
                    <p className="leading-[normal]">Заполнить анкету</p>
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
