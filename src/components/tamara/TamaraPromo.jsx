import { useEffect, useRef, useState } from "react";

const TamaraPromo = ({ price, currency, lang = "en", countryCode }) => {
  const tamaraRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  // console.log("Tamara Props: ", price, currency, countryCode);

  useEffect(() => {
    const SUPPORTED_CURRENCIES = ["AED", "SAR"];
    if (!SUPPORTED_CURRENCIES.includes(currency)) {
      console.warn("Unsupported currency for Tamara Promo");
      return;
    }

    const loadTamaraScript = () => {
      if (document.getElementById("tamara-promo-script")) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.tamara.co/widget/product-widget.min.js";
      script.async = true;
      script.id = "tamara-promo-script";
      script.onload = () => {
        setScriptLoaded(true);
        console.log("Tamara script loaded successfully");
      };
      document.body.appendChild(script);
    };

    loadTamaraScript();
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.TamaraProductWidget || !tamaraRef.current) return;

    // Clear previous widget before re-initializing
    tamaraRef.current.innerHTML = "";

    try {
      new window.TamaraProductWidget({
        selector: "#tamara-promo-widget",
        price: price.toFixed(2),
        currency,
        countryCode,
        lang,
      });
      console.log("Tamara widget initialized successfully");
    } catch (error) {
      console.error("Error initializing Tamara Widget:", error);
    }
  }, [scriptLoaded, price, currency, lang, countryCode]);

  return <div id="tamara-promo-widget" ref={tamaraRef} style={{ display: "block" }} />;
};

export default TamaraPromo;
