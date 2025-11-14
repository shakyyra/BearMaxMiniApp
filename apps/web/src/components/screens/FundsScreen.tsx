import { useCallback, useEffect, useMemo, useState } from "react";
import { FundCard } from "../FundCard";
import { api } from "../../services/api";
import type { FundItem } from "../../types/api";

export function FundsScreen() {
  const [funds, setFunds] = useState<FundItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    api
      .listFunds()
      .then((response) => {
        if (!isMounted) return;
        setFunds(response.items);
      })
      .catch((err: Error) => {
        if (!isMounted) return;
        setError(err.message || "Не удалось загрузить фонды");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleHelp = useCallback((fund: FundItem) => {
    const donateUrl = fund.help_money || fund.url;
    window.open(donateUrl, "_blank", "noopener");
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <p className="text-sm text-[#787878]">Загружаем фонды…</p>;
    }

    if (error) {
      return <p className="text-sm text-[#EF4444]">{error}</p>;
    }

    if (!funds.length) {
      return <p className="text-sm text-[#787878]">Фонды пока не добавлены.</p>;
    }

    return funds.map((fund) => (
      <FundCard
        key={fund.slug}
        name={fund.name}
        city={fund.main_city}
        imageUrl={fund.image}
        onHelp={() => handleHelp(fund)}
      />
    ));
  }, [error, funds, handleHelp, isLoading]);

  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[24px] items-start justify-center left-0 px-[24px] py-0 right-0 top-[303px] pb-[96px]"
      data-name="Number input"
    >
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Paragraph container">
        <p className="basis-0 font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#4b4b4b] text-[20px]">
          Список благотворительных фондов
        </p>
      </div>

      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Cards">
        {content}
      </div>
    </div>
  );
}
