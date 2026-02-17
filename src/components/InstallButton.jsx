import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(true);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowButton(true);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the install");
        }
        setShowButton(false);
      });
    }
  };

  return (
    <>
      {showButton && (
        <>
          <button
            onClick={handleInstall}
            className="fixed bottom-2 right-2 px-5 py-3 
                       bg-[#000]/40 backdrop-blur-sm border border-[#fff]/20 
                       text-[#fff] shadow-lg rounded-xl 
                       hover:bg-[#000]/80 hover:border-white/30 
                       transition-all duration-300 ease-in-out text-2xl"
          >
            Install App
          </button>

          {isIOS && showIOSGuide && (
            <div className="fixed bottom-16 right-3 bg-[#fff] p-4 pr-10 rounded-xl shadow-xl text-[#000] max-w-[220px] text-sm">
              {/* X close button */}
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-base font-bold"
                aria-label="Close"
              >
                ✕
              </button>

              <p className="font-semibold mb-2">📱 To install:</p>
              <p className="mb-1">1️⃣ Tap <strong>Share</strong> (📤) in Safari</p>
              <p className="mb-1">2️⃣ Select <strong>"Add to Home Screen"</strong></p>
              <p>3️⃣ Enjoy the Ramadan Quiz! 🎉</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InstallButton;