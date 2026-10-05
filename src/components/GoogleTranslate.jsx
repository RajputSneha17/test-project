import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const protectSilkenWord = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      );

      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.includes("रेशमी")) {
          node.nodeValue = node.nodeValue.replace(/रेशमी/g, "सिल्कन");
        }
        if (node.nodeValue && node.nodeValue.includes("आदेश")) {
          node.nodeValue = node.nodeValue.replace(/आदेश/g, "ऑर्डर");
        }
        if (node.nodeValue && node.nodeValue.includes("एन")) {
          node.nodeValue = node.nodeValue.replace(/एन/g, "EN");
        }
      }
    };

    const observer = new MutationObserver(() => {
      protectSilkenWord();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // 2. Google Translate Script Loader
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => observer.disconnect();
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
    const select = document.querySelector(".goog-te-combo");

    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      setTimeout(() => {
        const retrySelect = document.querySelector(".goog-te-combo");
        if (retrySelect) {
          retrySelect.value = langCode;
          retrySelect.dispatchEvent(new Event("change"));
        }
      }, 500);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div id="google_translate_element" style={{ display: "none" }} />

      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-300">
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            currentLang === "en"
              ? "bg-black text-white shadow-sm"
              : "text-gray-700 hover:text-black"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("hi")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            currentLang === "hi"
              ? "bg-black text-white shadow-sm"
              : "text-gray-700 hover:text-black"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
};

export default GoogleTranslate;
