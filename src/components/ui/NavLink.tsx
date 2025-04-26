import React from 'react';

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
  className = "px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-300 transition-colors duration-300",
  activeClassName = "bg-gray-800",
}) => {
  // In a real app, we'd check if the current path matches the href
  const isActive = window.location.pathname === href;
  
  return (
    <a
      href={href}
      className={`${className} ${isActive ? activeClassName : ''} flex items-center gap-2`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </a>
  );
};

export default NavLink;