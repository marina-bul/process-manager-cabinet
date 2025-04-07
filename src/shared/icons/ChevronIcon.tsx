import type { FC } from "react";
import type { IconProps } from "types/general";

export const ChevronIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_8740_2174)">
        <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_8740_2174">
          <rect width="20" height="20" fill="currentColor"/>
        </clipPath>
      </defs>
    </svg>
  );
};

