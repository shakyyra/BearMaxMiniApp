import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { BottomNav, TabType } from "./components/BottomNav";
import { FundsScreen } from "./components/screens/FundsScreen";
import { MasterclassFormScreen } from "./components/screens/MasterclassFormScreen";
import { MasterclassDetailsScreen } from "./components/screens/MasterclassDetailsScreen";
import { MentoringFormScreen } from "./components/screens/MentoringFormScreen";
import { MentoringDetailsScreen } from "./components/screens/MentoringDetailsScreen";
import { Loader } from "./components/Loader";
import { FundsBanner } from "./components/banners/FundsBanner";
import { MasterclassBanner } from "./components/banners/MasterclassBanner";
import { MentoringBanner } from "./components/banners/MentoringBanner";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { FundsModal } from "./components/modals/FundsModal";
import { MasterclassModal } from "./components/modals/MasterclassModal";
import { MentoringModal } from "./components/modals/MentoringModal";
import onboardingImage from "@/assets/onboarding-illustration.png";
import fundsModalImage from "@/assets/funds-help-illustration.png";
import masterclassModalImage from "@/assets/masterclass-illustration.png";
import mentoringModalImage from "@/assets/mentoring-illustration.png";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { api } from "./services/api";
import type { City, EducationLevel } from "./types/api";
import type { FormValues } from "./types/forms";

const DEFAULT_ACCOUNT_ID = Number(import.meta.env?.VITE_DEFAULT_ACCOUNT_ID ?? "1");
const VISITED_TABS_STORAGE_KEY = 'maxappVisitedTabs';
const STORAGE_TAB_VALUES: TabType[] = ['funds', 'masterclass', 'mentoring'];

const getInitialVisitedTabs = (): Set<TabType> => {
  if (typeof window === 'undefined') {
    return new Set();
  }

  const storedValue = localStorage.getItem(VISITED_TABS_STORAGE_KEY);
  if (!storedValue) {
    return new Set();
  }

  try {
    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) {
      return new Set();
    }
    const validTabs = parsed.filter((tab: unknown): tab is TabType =>
      STORAGE_TAB_VALUES.includes(tab as TabType)
    );
    return new Set(validTabs);
  } catch {
    return new Set();
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('funds');
  const [masterclassStep, setMasterclassStep] = useState<'form' | 'details'>('form');
  const [mentoringStep, setMentoringStep] = useState<'form' | 'details'>('form');
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('hasSeenOnboarding') === 'true';
  });
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  
  // Modal states
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [showMasterclassModal, setShowMasterclassModal] = useState(false);
  const [showMentoringModal, setShowMentoringModal] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [commonDataReady, setCommonDataReady] = useState(false);
  const [commonError, setCommonError] = useState<string | null>(null);
  const [masterclassFormValues, setMasterclassFormValues] = useState<FormValues | null>(null);
  const [mentoringFormValues, setMentoringFormValues] = useState<FormValues | null>(null);
  
  // Track which tabs have been visited
  const [visitedTabs, setVisitedTabs] = useState<Set<TabType>>(() => getInitialVisitedTabs());

  useEffect(() => {
    const loadCommonData = async () => {
      try {
        const [citiesData, educationData] = await Promise.all([
          api.getCities(),
          api.getEducationLevels(),
        ]);
        setCities(citiesData);
        setEducationLevels(educationData);
      } catch (error) {
        console.error("Не удалось загрузить справочные данные", error);
        setCommonError("Не удалось загрузить справочные данные. Попробуйте обновить страницу.");
      } finally {
        setCommonDataReady(true);
      }
    };

    loadCommonData();
  }, []);

  const preloaderImages = useMemo(
    () => [onboardingImage, fundsModalImage, masterclassModalImage, mentoringModalImage],
    []
  );
  const imagesReady = useImagePreloader(preloaderImages);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimerComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTimerComplete && imagesReady && commonDataReady) {
      setIsLoading(false);
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [commonDataReady, hasSeenOnboarding, imagesReady, isTimerComplete]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(VISITED_TABS_STORAGE_KEY, JSON.stringify(Array.from(visitedTabs)));
  }, [visitedTabs]);

  // Show modal when visiting a tab for the first time
  useEffect(() => {
    if (!showOnboarding && !isLoading && !visitedTabs.has(activeTab)) {
      setVisitedTabs(prev => new Set(prev).add(activeTab));
      
      // Show modal for first time visit
      switch (activeTab) {
        case 'funds':
          setShowFundsModal(true);
          break;
        case 'masterclass':
          setShowMasterclassModal(true);
          break;
        case 'mentoring':
          setShowMentoringModal(true);
          break;
      }
    }
  }, [activeTab, showOnboarding, isLoading, visitedTabs]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: String(city.id), label: city.name })),
    [cities]
  );

  const educationOptions = useMemo(
    () => educationLevels.map((level) => ({ value: String(level.id), label: level.name })),
    [educationLevels]
  );

  const handleMasterclassFormSubmit = useCallback(
    (values: FormValues) => {
      setMasterclassFormValues(values);
      setMasterclassStep('details');
    },
    []
  );

  const handleMasterclassDetailsSubmit = useCallback(
    async (values: FormValues) => {
      if (!masterclassFormValues) {
        alert('Не удалось определить данные формы. Пожалуйста, заполните первый шаг повторно.');
        setMasterclassStep('form');
        return;
      }

      try {
        const cityId = Number(values.city);
        const educationId = Number(values.education);
        if (Number.isNaN(cityId) || Number.isNaN(educationId)) {
          alert('Выберите город и образование из списка.');
          return;
        }

        await api.createMasterclassRequest({
          first_name: masterclassFormValues.firstName || '',
          last_name: masterclassFormValues.lastName || '',
          middle_name: masterclassFormValues.patronymic || '',
          phone: masterclassFormValues.phone || '',
          email: masterclassFormValues.email || '',
          city_id: cityId,
          education_id: educationId,
          description: values.description || '',
          account_id: DEFAULT_ACCOUNT_ID,
        });
        alert('Заявка на мастер-класс отправлена!');
        setMasterclassFormValues(null);
        setMasterclassStep('form');
      } catch (error) {
        console.error(error);
        alert('Не удалось отправить заявку. Попробуйте снова.');
      }
    },
    [masterclassFormValues]
  );

  const handleMentoringFormSubmit = useCallback((values: FormValues) => {
    setMentoringFormValues(values);
    setMentoringStep('details');
  }, []);

  const handleMentoringDetailsSubmit = useCallback(
    async (values: FormValues) => {
      if (!mentoringFormValues) {
        alert('Не удалось определить данные формы. Пожалуйста, заполните первый шаг повторно.');
        setMentoringStep('form');
        return;
      }

      try {
        const cityId = Number(values.city);
        const educationId = Number(values.education);
        if (Number.isNaN(cityId) || Number.isNaN(educationId)) {
          alert('Выберите город и образование из списка.');
          return;
        }

        await api.createMentorshipRequest({
          first_name: mentoringFormValues.firstName || '',
          last_name: mentoringFormValues.lastName || '',
          middle_name: mentoringFormValues.middleName || '',
          phone: mentoringFormValues.phone || '',
          email: mentoringFormValues.email || '',
          account_id: DEFAULT_ACCOUNT_ID,
          city_id: cityId,
          education_id: educationId,
          description: values.description || '',
          max_account_url: mentoringFormValues.maxAccount || '',
        });
        alert('Заявка наставника отправлена!');
        setMentoringFormValues(null);
        setMentoringStep('form');
      } catch (error) {
        console.error(error);
        alert('Не удалось отправить заявку. Попробуйте снова.');
      }
    },
    [mentoringFormValues]
  );

  // Get the banner component based on active tab
  const getBanner = () => {
    switch (activeTab) {
      case 'funds':
        return <FundsBanner onDetailsClick={() => setShowFundsModal(true)} />;
      case 'masterclass':
        return <MasterclassBanner onDetailsClick={() => setShowMasterclassModal(true)} />;
      case 'mentoring':
        return <MentoringBanner onDetailsClick={() => setShowMentoringModal(true)} />;
      default:
        return <FundsBanner onDetailsClick={() => setShowFundsModal(true)} />;
    }
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'masterclass') {
      setMasterclassStep('form');
    }
    if (tab === 'mentoring') {
      setMentoringStep('form');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="bg-[#F5F5F7] relative w-full min-h-screen max-w-[428px] mx-auto overflow-x-hidden" data-name="Home">
      {commonError && (
        <div className="bg-[#FEF3C7] text-[#92400E] text-sm px-4 py-2 text-center">
          {commonError}
        </div>
      )}
      <Header banner={getBanner()} />
      
      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'funds' && <FundsScreen key="funds" />}
        {activeTab === 'masterclass' && masterclassStep === 'form' && (
          <MasterclassFormScreen key="masterclass-form" onSubmit={handleMasterclassFormSubmit} />
        )}
        {activeTab === 'masterclass' && masterclassStep === 'details' && (
          <MasterclassDetailsScreen
            key="masterclass-details"
            cityOptions={cityOptions}
            educationOptions={educationOptions}
            onSubmit={handleMasterclassDetailsSubmit}
          />
        )}
        {activeTab === 'mentoring' && mentoringStep === 'form' && (
          <MentoringFormScreen key="mentoring-form" onSubmit={handleMentoringFormSubmit} />
        )}
        {activeTab === 'mentoring' && mentoringStep === 'details' && (
          <MentoringDetailsScreen
            key="mentoring-details"
            cityOptions={cityOptions}
            educationOptions={educationOptions}
            onSubmit={handleMentoringDetailsSubmit}
          />
        )}
      </AnimatePresence>
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Modals */}
      <FundsModal isOpen={showFundsModal} onClose={() => setShowFundsModal(false)} />
      <MasterclassModal isOpen={showMasterclassModal} onClose={() => setShowMasterclassModal(false)} />
      <MentoringModal isOpen={showMentoringModal} onClose={() => setShowMentoringModal(false)} />
    </div>
  );
}
