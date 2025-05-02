import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  icon,
  className = "px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-900 transition-colors duration-300",
  activeClassName = "bg-zinc-300 dark:bg-zinc-900",
}) => {
  const isActive = window.location.pathname === href;
  
  return (
    <Link
      to={href}
      className={`${className} ${isActive ? activeClassName : ''} flex items-center gap-2`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;