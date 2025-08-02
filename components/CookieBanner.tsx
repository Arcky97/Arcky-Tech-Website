"use client"

import { useEffect, useState } from "react";
import { ToggleSwitch }from "./ToggleSwitch"
import ColorButton from "./ColorButton";
import { CogIcon } from "lucide-react";

declare global {
  interface Window {
    cookieConsent?: Consent;
  }
}

type Consent = {
  analytics: boolean;
  preferences: boolean;
};

const defaultConsent: Consent = {
  analytics: false,
  preferences: false 
};

export const CookieBanner = () => {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "reentering" | "idle" | "exiting">("idle");
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<Consent>(defaultConsent);
  const [selectionMode, setSelectionMode] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookieConsent");
    if (stored) {
      setHasConsent(true);
      window.cookieConsent = JSON.parse(stored);
    } else {
      setSelectionMode(true)
      setShowBanner(true);
      setAnimationPhase("entering");
      document.body.classList.add("lock-scrollbar");
      setTimeout(() => setAnimationPhase("idle"), 400);
    }

    return () => {
      document.body.classList.remove("lock-scrollbar");
    };
  }, []);

  const triggerExitAnimationAndSave = (values: Consent) => {
    setAnimationPhase("exiting");
    setTimeout(() => {
      saveConsent(values)
    }, 600);
  }

  const saveConsent = (values: Consent) => {
    localStorage.setItem("cookieConsent", JSON.stringify(values));
    window.cookieConsent = values;
    setHasConsent(true);
    setShowBanner(false);
    document.body.classList.remove("lock-scrollbar");
    setAnimationPhase("idle");
  };

  const allowAll = () => {
    triggerExitAnimationAndSave({ analytics: true, preferences: true });
  };

  const denyAll = () => {
    triggerExitAnimationAndSave({ analytics: false, preferences: false });
  };

  const allowSelection = () => {
    triggerExitAnimationAndSave(consent);
  };

  const openSettings = () => {
    setAnimationPhase("reentering");
    const stored = localStorage.getItem("cookieConsent");
    if (stored) {
      setConsent(JSON.parse(stored));
    }

    setSelectionMode(true);
    setShowBanner(true);
    document.body.classList.add("lock-scrollbar");
    requestAnimationFrame(() => {
      setTimeout(() => setAnimationPhase("idle"), 400);
    });
  };

  let animationClasses = "";
  if (animationPhase === "entering") {
    animationClasses = "opacity-0 -translate-y-[50%]"
  } else if (animationPhase === "reentering") {
    animationClasses = "opacity-0 scale-5 translate-x-[-48vw] translate-y-[48vh]"
  } else if (animationPhase === "idle") {
    animationClasses = "opacity-100 translate-y-0 scale-100"
  } else if (animationPhase === "exiting") {
    animationClasses = "opacity-0 scale-5 translate-x-[-48vw] translate-y-[48vh]"
  }

  const shouldShowSettingsButton = hasConsent && !showBanner;
  const shouldHideSettingsButton = animationPhase === "reentering" || animationPhase === "exiting";
  
  return (
    <>
      {showBanner && (
        <>
          {/* Background overlay */}
          <div className={`fixed inset-0 bg-black z-51 transition-opacity duration-400 ease-in-out ${
            animationPhase === "entering" || animationPhase === "reentering"
              ? "opacity-0"
              : animationPhase === "idle"
                ? "opacity-70"
                : "opacity-0"
          }`}/>

          {/* Modal Content */}
          <div className={`fixed inset-0 z-52 flex items-center justify-center transition-all duration-400 transform ease-in-out ${animationClasses}`}>
            <div className="bg-gray-900 text-white border border-gray-600/75 p-6 rounded-lg shadow-2xl max-w-3xl w-full mx-4">
              <div className="max-w-3xl mx-auto flex flex-col sm:flew-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="head3 px-2">We use cookies 🍪</h3>
                  <p className="text-base text-left p-2">
                    We use essential cookies to keep our site running smoothly. With your consent, we also use preference cookies to remember your settings and analytics cookies to help us understand how visitors use the site.
                  </p>
                  <hr className="horRule"/>
                  {selectionMode && (
                    <div className="grid md:grid-cols-2 mt-4 space-y-2 px-2">
                      <ToggleSwitch
                        label="Essential Cookies"
                        description="Used to help make basic function work on the website."
                        state={true}
                        disabled={true}
                        onChange={() => false}
                        className="pb-2"
                      />
                      <ToggleSwitch
                        label="Analytics Cookies"
                        description="Used to track site usage and traffic sources."
                        state={consent.analytics}
                        onChange={(val) => 
                          setConsent((c) => ({ ...c, analytics: val }))
                        }
                        className="pb-2"
                      />
                      <ToggleSwitch
                        label="Preferences Cookies"
                        description="Used to remember your settings and preferences."
                        state={consent.preferences}
                        onChange={(val) => 
                          setConsent((c) => ({ ...c, preferences: val }))
                        }
                        className="pb-2"
                      />
                    </div>
                  )}
                </div>
                <hr className="horRule"/>
                <div className="flex flex-col md:flex-row sm:items-end gap-5 px-2">
                  <>
                    <ColorButton
                      color="blue-600"
                      text="Deny"
                      action={denyAll}
                      extraClass="w-full md:w-1/3"
                    />
                    <ColorButton
                      color="blue-600"
                      text="Allow Selection"
                      action={allowSelection}
                      extraClass="w-full md:w-1/3"
                    />
                    <ColorButton
                      color="blue-600"
                      text="Allow All"
                      action={allowAll}
                      extraClass="w-full md:w-1/3"
                    />
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {hasConsent && (
        <div
          onClick={openSettings}
          className={`fixed bottom-4 left-4 z-51 flex items-center group transition-opacity duration-400 ease-in-out
            ${shouldShowSettingsButton && !shouldHideSettingsButton ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <CogIcon
            className="w-6 h-6 text-gray-200 transition-transform duration-500 group-hover:rotate-[360deg]"
          />
          <button
            
            className="ml-2 text-xs bg-gray-900 text-gray-200 px-1 py-1.5 rounded shadow 
                      transition-all duration-400 ease-in-out 
                      opacity-0 group-hover:opacity-100"
          >
            Cookie Settings
          </button>
        </div>
      )}
    </>
  )
}