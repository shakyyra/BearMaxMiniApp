import { ImageWithFallback } from "./shared/ImageWithFallback";

interface FundCardProps {
  name?: string;
  city?: string;
  imageUrl?: string;
  onHelp?: () => void;
}

export function FundCard({ 
  name = "Фонд красивые котики", 
  city = "Екатеринбург",
  imageUrl,
  onHelp
}: FundCardProps) {
  return (
    <div className="bg-white relative rounded-[15px] shrink-0 w-full" data-name="Fond card">
      <div aria-hidden="true" className="absolute border border-[#bcbcbc] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center p-[10px] relative w-full">
          {/* Image */}
          <div className="content-stretch flex flex-col gap-[10px] h-[125px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Checkbox">
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Image">
              {imageUrl ? (
                <ImageWithFallback
                  src={imageUrl}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover rounded-[10px]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100 rounded-[10px] flex items-center justify-center">
                  <span className="text-purple-400 opacity-50">🐱</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Info and Button */}
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Card">
            <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.6] relative shrink-0 text-[#4b4b4b] w-full" data-name="Paragraph container">
              <p className="font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold min-w-full relative shrink-0 text-[13px] w-[min-content]">{name} </p>
              <p className="font-['Plus_Jakarta_Sans:Regular','Noto_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[10px] text-nowrap whitespace-pre">{city}</p>
            </div>
            
            <button 
              onClick={onHelp}
              className="bg-indigo-600 relative rounded-[10px] shrink-0 w-full hover:bg-indigo-700 transition-colors"
              data-name="Button"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[8px] relative w-full">
                  <p className="basis-0 font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold grow leading-[1.6] min-h-px min-w-px relative shrink-0 text-[10px] text-center text-white">Помочь фонду</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
