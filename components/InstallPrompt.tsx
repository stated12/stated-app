"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    const dismissed = localStorage.getItem("install-dismissed");

    if (alreadyInstalled || dismissed) return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    localStorage.setItem("install-dismissed", "true");
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("install-dismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md mb-4 bg-white rounded-2xl shadow-2xl p-5 border">

        <div className="font-semibold text-gray-900 mb-1">
          Install Stated
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Track your commitments faster.
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={handleDismiss}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Not now
          </button>

          <button
            onClick={handleInstall}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Install
          </button>

        </div>
      </div>
    </div>
  );
}
