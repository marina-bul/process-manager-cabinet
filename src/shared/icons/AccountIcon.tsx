import type { FC } from "react";
import type { IconProps } from "types/general";


export const AccountIcon: FC<IconProps> = ({ className }) => {
  return (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.6 2.44024C14.9335 3.13328 15.85 4.57237 15.85 6.23529C15.85 7.89822 14.9335 9.33731 13.6 10.0303M15.4 14.9566C16.7603 15.6003 17.9853 16.6494 19 18M1 18C2.75184 15.6683 5.13026 14.2353 7.75 14.2353C10.3697 14.2353 12.7482 15.6683 14.5 18M11.8 6.23529C11.8 8.57438 9.98675 10.4706 7.75 10.4706C5.51325 10.4706 3.7 8.57438 3.7 6.23529C3.7 3.89621 5.51325 2 7.75 2C9.98675 2 11.8 3.89621 11.8 6.23529Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );
};

