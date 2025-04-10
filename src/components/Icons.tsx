
import React from 'react';

export const AppleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
};

export const AndroidIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
    </svg>
  );
};

export const TowTruckIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tow truck cab */}
      <path d="M16 18h3c1 0 2-1 2-2v-2c0-1.5-1-3-2-3h-1.5" />
      <path d="M15 11h-2V8c0-1 1-2 2-2h1c1 0 2 1 2 2v1" />
      <path d="M17.5 18c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" />
      
      {/* Flatbed platform */}
      <path d="M2 18h12" />
      <path d="M14 18V8H2v10" />
      <path d="M4.5 18c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" />
      
      {/* Car on flatbed */}
      <path d="M11 11H5v3h6v-3z" />  {/* car body */}
      <path d="M11 11l-1-2H6l-1 2" />  {/* car windshield/hood */}
      <path d="M6 14c0 .3-.2.5-.5.5S5 14.3 5 14s.2-.5.5-.5.5.2.5.5z" />  {/* left wheel */}
      <path d="M10 14c0 .3-.2.5-.5.5S9 14.3 9 14s.2-.5.5-.5.5.2.5.5z" />  {/* right wheel */}
    </svg>
  );
};
