import React from 'react';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}
  >
    <path d="M12 2L1 9l4 12h14l4-12L12 2zm0 4.34L16.95 9l-1.63 5.18h-6.64L7.05 9L12 6.34zM7 19l3-8h4l3 8H7z"/>
  </svg>
);

export default LogoIcon;