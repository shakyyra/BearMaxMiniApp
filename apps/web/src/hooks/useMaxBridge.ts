import { useEffect, useState } from "react";
import type { MaxRequestContactResult, MaxWebAppUser } from "../types/maxBridge";

type MaxBridgeData = {
  user: MaxWebAppUser | null;
  phone: string | null;
  isBridgeAvailable: boolean;
  needsPhoneInput: boolean;
};

const PLACEHOLDER_USER: MaxWebAppUser = {
  first_name: "MAX",
  last_name: "User",
};

const EXTRACT_PHONE = (result: MaxRequestContactResult): string | null => {
  if (!result) {
    return null;
  }
  if (typeof result === "string") {
    const trimmed = result.trim();
    return trimmed.length ? trimmed : null;
  }
  if (typeof result === "object" && "phone" in result) {
    const value = result.phone;
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    }
  }
  return null;
};

export function useMaxBridge(): MaxBridgeData {
  const [user, setUser] = useState<MaxWebAppUser | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [isBridgeAvailable, setIsBridgeAvailable] = useState(false);
  const [needsPhoneInput, setNeedsPhoneInput] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setNeedsPhoneInput(true);
      setUser(PLACEHOLDER_USER);
      return;
    }

    const webApp = window.WebApp;
    if (!webApp) {
      setNeedsPhoneInput(true);
      setUser(PLACEHOLDER_USER);
      return;
    }

    setIsBridgeAvailable(true);
    webApp.ready?.();

    if (webApp.initDataUnsafe?.user) {
      setUser(webApp.initDataUnsafe.user);
    } else {
      setUser(PLACEHOLDER_USER);
    }

    if (!webApp.requestContact) {
      setNeedsPhoneInput(true);
      return;
    }

    webApp
      .requestContact()
      .then((result) => {
        const extracted = EXTRACT_PHONE(result);
        if (extracted) {
          setPhone(extracted);
          setNeedsPhoneInput(false);
        } else {
          setNeedsPhoneInput(true);
        }
      })
      .catch(() => {
        setNeedsPhoneInput(true);
      });
  }, []);

  return {
    user,
    phone,
    isBridgeAvailable,
    needsPhoneInput,
  };
}
