import { motion } from "framer-motion";
import svgPaths from "../imports/nav-icon-paths";

export type TabType = "funds" | "masterclass" | "mentoring";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bg-white bottom-0 left-0 right-0 box-border content-stretch flex gap-[12px] h-[72px] items-center justify-center px-[24px] py-[6px] shadow-[0px_-4px_24px_0px_rgba(79,70,229,0.15)] z-40 max-w-[428px] mx-auto" data-name="Pagination">
      {/* Funds Tab */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange("funds")}
        className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
        data-name="Button container"
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center px-[20px] py-[12px] relative size-full">
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[22px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g>
                    <path d={svgPaths.p2de05100} stroke={activeTab === "funds" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.5" />
                    <path d={svgPaths.p18290b80} fill={activeTab === "funds" ? "#4F46E5" : "#A5A5A5"} />
                    <path d={svgPaths.p30f92c00} stroke={activeTab === "funds" ? "#4F46E5" : "#A5A5A5"} strokeLinecap="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              <p className={`font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[1.6] relative shrink-0 text-[10px] text-center text-nowrap ${activeTab === "funds" ? "text-indigo-600" : "text-[#a5a5a5]"}`}>
                Фонды
              </p>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Masterclass Tab */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange("masterclass")}
        className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center px-[20px] py-[12px] relative size-full">
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[22px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g>
                    <path d={svgPaths.p3b6ac740} fill={activeTab === "masterclass" ? "#4F46E5" : "#A5A5A5"} />
                  </g>
                </svg>
              </div>
              <p className={`font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[1.6] relative shrink-0 text-[10px] text-center text-nowrap ${activeTab === "masterclass" ? "text-indigo-600" : "text-[#a5a5a5]"}`}>
                Мастер-класс
              </p>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Mentoring Tab */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange("mentoring")}
        className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center px-[20px] py-[12px] relative size-full">
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0">
              <div className="overflow-clip relative rounded-[2px] shrink-0 size-[22px]">
                <div className="absolute inset-[4.17%_9.38%_5.21%_9.38%]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-3.45%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 23">
                      <g>
                        <circle cx="6.75" cy="11.75" r="1" stroke={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.2" />
                        <circle cx="4.75" cy="5.75" r="2" stroke={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.5" />
                        <circle cx="9.75" cy="3.75" r="3" stroke={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.5" />
                        <circle cx="14.75" cy="5.75" r="2" stroke={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.5" />
                        <path d={svgPaths.p14c8c980} fill={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} />
                        <circle cx="12.75" cy="11.75" r="1" stroke={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} strokeWidth="1.2" />
                        <path d={svgPaths.p28d98200} fill={activeTab === "mentoring" ? "#4F46E5" : "#A5A5A5"} />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <p className={`font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[1.6] relative shrink-0 text-[10px] text-center text-nowrap ${activeTab === "mentoring" ? "text-indigo-600" : "text-[#a5a5a5]"}`}>
                Наставничество
              </p>
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
