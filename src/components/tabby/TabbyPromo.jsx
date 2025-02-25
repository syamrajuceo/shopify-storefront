import { useEffect, useRef } from "react";

export const TabbyPromo = ({
  price,
  currency,
  lang = "en",
  apiKey,
  merchantCode,
}) => {
    // console.log(price,currency)
  const tabbyRef = useRef(null);

  useEffect(() => {
    const SUPPORTED_CURRENCIES = {
      AED: "AED",
      KWD: "KWD",
      SAR: "SAR",
    };

    const CURRENCY_DIGITS_COUNT = {
      AED: 2,
      SAR: 2,
      KWD: 3,
    };

    const CURRENCY_NAME_TO_CODE_MAP = {
      AED: SUPPORTED_CURRENCIES.AED,
      KWD: SUPPORTED_CURRENCIES.KWD,
      SAR: SUPPORTED_CURRENCIES.SAR,
      KD: SUPPORTED_CURRENCIES.KWD,
      SR: SUPPORTED_CURRENCIES.SAR,
      Dh: SUPPORTED_CURRENCIES.AED,
      Dhs: SUPPORTED_CURRENCIES.AED,
    };

    if (!SUPPORTED_CURRENCIES[currency]) {
      console.warn("Unsupported currency for Tabby Promo");
      return;
    }

    const loadTabbyScript = () => {
      if (document.getElementById("tabby-promo-script")) return;
      const script = document.createElement("script");
      script.src = "https://checkout.tabby.ai/tabby-promo.js";
      script.async = true;
      script.id = "tabby-promo-script";
      document.body.appendChild(script);
    };

    loadTabbyScript();

    const initializeTabbyPromo = () => {
      if (!window.TabbyPromo || !tabbyRef.current) return;

      tabbyRef.current.innerHTML = ""; // Clear previous instance

      new window.TabbyPromo({
        selector: "#TabbyPromo",
        currency,
        price: price / Math.pow(10, CURRENCY_DIGITS_COUNT[currency]),
        lang,
        installmentsCount: 4,
        publicKey: apiKey, // Provide your Tabby API Key
        merchantCode, // 'ksa' for SAR, 'KW' for KWD, 'default' for AED
      });
    };

    const checkTabbyLoaded = setInterval(() => {
      if (window.TabbyPromo) {
        clearInterval(checkTabbyLoaded);
        initializeTabbyPromo();
      }
    }, 500);

    return () => clearInterval(checkTabbyLoaded);
  }, [price, currency, lang, apiKey, merchantCode]);

  return <div id="TabbyPromo" ref={tabbyRef} style={{ display: "block" }} />;
};
