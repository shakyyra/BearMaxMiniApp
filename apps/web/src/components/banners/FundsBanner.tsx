import svgPaths from "../../imports/banner-illustration-paths";

interface FundsBannerProps {
  onDetailsClick?: () => void;
}

function Group() {
  return (
    <div className="absolute inset-[44.04%_52.89%_40.98%_34.91%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Group">
          <path d={svgPaths.p3a91e000} fill="var(--fill-0, #FEFEFE)" id="Vector" />
          <path d={svgPaths.p18ed3940} fill="var(--fill-0, #818CF8)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[44.04%_34.91%_40.98%_52.89%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Group">
          <path d={svgPaths.p3a91e000} fill="var(--fill-0, #FEFEFE)" id="Vector" />
          <path d={svgPaths.p1576b000} fill="var(--fill-0, #818CF8)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[44.04%_34.91%_40.98%_34.91%]" data-name="Group">
      <Group />
      <Group1 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents inset-[44.04%_34.91%_32.79%_34.91%]" data-name="_2633823727920">
      <Group2 />
      <div className="absolute inset-[62.49%_46.37%_32.79%_45.75%]" data-name="Vector">
        <div className="absolute inset-[-19.18%_-9.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path clipRule="evenodd" d={svgPaths.p211a6e72} fill="var(--fill-0, #FEFEFE)" fillRule="evenodd" id="Vector" stroke="var(--stroke-0, #FEFEFE)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="22.9256" strokeWidth="1.47289" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="absolute contents inset-[2.74%_2.2%_2.71%_2.2%]" data-name="Слой_x0020_1">
      <Component1 />
      <div className="absolute inset-[2.74%_2.2%_2.71%_2.2%]" data-name="Vector">
        <div className="absolute inset-[-2.87%_-2.31%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 82">
            <path d={svgPaths.p1686e6f0} id="Vector" stroke="var(--stroke-0, #FEFEFE)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="22.9256" strokeWidth="4.42451" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="h-[81.43px] overflow-clip relative shrink-0 w-[100px]" data-name="мишка потолше бели 2">
      <X />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] w-full">{`Куда идет моя помощь? `}</p>
      <p className="font-['Plus_Jakarta_Sans:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[13px] w-full">На наставничество, учёбу и реабилитацию</p>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center p-[8px] relative rounded-[10px] shrink-0 w-[144px] hover:bg-indigo-700 active:bg-indigo-800 transition-colors cursor-pointer"
      data-name="Button"
    >
      <p className="font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[1.6] relative shrink-0 text-[10px] text-center text-nowrap text-white whitespace-pre">Подробнее</p>
    </button>
  );
}

function Frame1({ onDetailsClick }: { onDetailsClick?: () => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame />
      <Button onClick={onDetailsClick} />
    </div>
  );
}

function Frame2({ onDetailsClick }: { onDetailsClick?: () => void }) {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      <Component />
      <Frame1 onDetailsClick={onDetailsClick} />
    </div>
  );
}

export function FundsBanner({ onDetailsClick }: FundsBannerProps) {
  return (
    <div className="relative rounded-[45px] size-full" data-name="Card" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 412 235\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-72.85 -63 26.854 -31.052 367 209.5)\\'><stop stop-color=\\'rgba(3,7,43,1)\\' offset=\\'0.10468\\'/><stop stop-color=\\'rgba(9,12,67,0.9525)\\' offset=\\'0.21659\\'/><stop stop-color=\\'rgba(16,16,91,0.905)\\' offset=\\'0.32851\\'/><stop stop-color=\\'rgba(29,25,138,0.81)\\' offset=\\'0.55234\\'/><stop stop-color=\\'rgba(22,53,167,0.7475)\\' offset=\\'0.66425\\'/><stop stop-color=\\'rgba(15,80,196,0.685)\\' offset=\\'0.77617\\'/><stop stop-color=\\'rgba(0,136,255,0.56)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center overflow-clip px-[20px] py-px relative size-full">
          <Frame2 onDetailsClick={onDetailsClick} />
        </div>
      </div>
    </div>
  );
}
