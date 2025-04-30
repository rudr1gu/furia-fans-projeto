import { useEffect, useState } from "react";
import logo from "../../assets/furia.png"

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center animate-fadeIn">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold">Furia</h1>
        <p className="text-sm text-gray-400">Carregando sua experiência...</p>
      </div>
    </div>
  );
}

export default SplashScreen;
