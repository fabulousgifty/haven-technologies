import React from 'react';

interface HavenLogoProps {
  className?: string;
  size?: number;
  variant?: 'color' | 'light' | 'dark' | 'monochrome';
}

/**
 * Extracted Official Logo for Haven Technologies.
 * Features the signature electric blue gradient smartphone seamlessly
 * morphing into a rolling retail cart with left-mounted handle and dual wheels.
 */
export const HavenLogo: React.FC<HavenLogoProps> = ({
  className = '',
  size = 42,
  variant = 'color',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="Haven Technologies Logo"
    >
      <defs>
        <linearGradient
          id="havenPhoneGradReact"
          x1="50"
          y1="12"
          x2="50"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00A2FF" />
          <stop offset="45%" stopColor="#006DE8" />
          <stop offset="100%" stopColor="#0046CA" />
        </linearGradient>

        <linearGradient
          id="havenDarkGrad"
          x1="50"
          y1="12"
          x2="50"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <filter
          id="havenLogoShadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="125%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="#0B1F3A"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* Main Glyph */}
      <g filter={variant === 'color' ? 'url(#havenLogoShadow)' : undefined}>
        {/* Upper Smartphone Body (Above cart cut) */}
        <path
          d="M37 22C37 16.4772 41.4772 12 47 12H65C70.5228 12 75 16.4772 75 22V36.5H37V22Z"
          fill={
            variant === 'light'
              ? '#FFFFFF'
              : variant === 'dark'
              ? 'url(#havenDarkGrad)'
              : 'url(#havenPhoneGradReact)'
          }
        />

        {/* Lower Smartphone Body (Cart Body & Base) */}
        <path
          d="M37 41.5H75V63C75 65.5 73 67.5 70.5 67.5H68C68 64.5 65.5 62 62.5 62C59.5 62 57 64.5 57 67.5H53C53 64.5 50.5 62 47.5 62C44.5 62 42 64.5 42 67.5H40C38.3431 67.5 37 66.1569 37 64.5V41.5Z"
          fill={
            variant === 'light'
              ? '#FFFFFF'
              : variant === 'dark'
              ? 'url(#havenDarkGrad)'
              : 'url(#havenPhoneGradReact)'
          }
        />

        {/* Top Bezel Cutouts */}
        {/* Camera Sensor Dot */}
        <circle
          cx="47.5"
          cy="18.5"
          r="1.7"
          fill={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
          opacity={variant === 'light' ? 0.35 : 0.95}
        />
        {/* Speaker Slit Capsule */}
        <rect
          x="52"
          y="17.4"
          width="8.8"
          height="2.3"
          rx="1.15"
          fill={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
          opacity={variant === 'light' ? 0.35 : 0.95}
        />

        {/* Cart Handle on Left Side */}
        {/* Blue Handle Grip */}
        <rect
          x="21"
          y="38.2"
          width="10.5"
          height="4.2"
          rx="2.1"
          fill={
            variant === 'light'
              ? '#FFFFFF'
              : variant === 'dark'
              ? '#38BDF8'
              : 'url(#havenPhoneGradReact)'
          }
        />
        {/* Connecting Handle Stem */}
        <path
          d="M29.5 40.3H38"
          stroke={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        {/* White Cart Basket Contour Frame */}
        <path
          d="M37 40.3H43.5L47.2 54.5C47.7 56.6 49.3 58 51.5 58H67.2C69.3 58 71 56.3 71.4 54.2L74.8 40.3"
          stroke={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Rolling Cart Wheels */}
        {/* Left Wheel */}
        <circle
          cx="47.5"
          cy="67.5"
          r="5.2"
          fill={
            variant === 'light'
              ? '#FFFFFF'
              : variant === 'dark'
              ? '#38BDF8'
              : 'url(#havenPhoneGradReact)'
          }
        />
        <circle
          cx="47.5"
          cy="67.5"
          r="2.3"
          fill={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
        />

        {/* Right Wheel */}
        <circle
          cx="62.5"
          cy="67.5"
          r="5.2"
          fill={
            variant === 'light'
              ? '#FFFFFF'
              : variant === 'dark'
              ? '#38BDF8'
              : 'url(#havenPhoneGradReact)'
          }
        />
        <circle
          cx="62.5"
          cy="67.5"
          r="2.3"
          fill={variant === 'light' ? '#0B1F3A' : '#FFFFFF'}
        />
      </g>
    </svg>
  );
};

