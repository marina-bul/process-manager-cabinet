import type { FC } from "react";
import type { IconProps } from "../../types/general";

export const CheckIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.875 5.62537L8.125 14.375L3.75 10.0004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"  strokeLinejoin="round"/>
    </svg>
  );
};

