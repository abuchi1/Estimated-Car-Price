
import React from 'react';

export const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M21.58,9.15l-3.32-4.43A3,3,0,0,0,15.7,4H8.3A3,3,0,0,0,5.74,4.72L2.42,9.15a4,4,0,0,0-.42,2.05V17a3,3,0,0,0,3,3H6a1,1,0,0,0,1-1V18a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v1a1,1,0,0,0,1,1h1a3,3,0,0,0,3-3V11.2A4,4,0,0,0,21.58,9.15ZM6,15a2,2,0,1,1,2-2A2,2,0,0,1,6,15Zm12,0a2,2,0,1,1,2-2A2,2,0,0,1,18,15ZM4.33,9.2,7,6H17l2.67,3.2Z" />
  </svg>
);
