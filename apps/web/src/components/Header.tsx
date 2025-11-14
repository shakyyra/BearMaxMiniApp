import { ReactNode } from "react";

interface HeaderProps {
  banner: ReactNode;
}

export function Header({ banner }: HeaderProps) {
  return (
    <div 
      className="absolute h-[235px] left-[8px] right-[8px] top-[8px]" 
      data-name="Header"
    >
      {banner}
    </div>
  );
}
