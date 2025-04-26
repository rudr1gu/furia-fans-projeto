import React from 'react';
import FuriaLogo from "../../assets/furia.png";
import Furia from "../../assets/logo-furia.svg";

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="flex items-center gap-2">
        <img src={FuriaLogo} alt="Logo" className="w-10 h-10" />
        <img src={Furia} alt='Furia' className='w-16 h-10 dark:invert' />
    </div>
  );
};

export default Logo;