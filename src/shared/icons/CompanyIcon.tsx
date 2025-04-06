import type { FC } from "react";
import type { IconProps } from "../../types/general";

export const CompanyIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.8756 5.625H3.12561C2.78043 5.625 2.50061 5.90482 2.50061 6.25V16.25C2.50061 16.5952 2.78043 16.875 3.12561 16.875H16.8756C17.2208 16.875 17.5006 16.5952 17.5006 16.25V6.25C17.5006 5.90482 17.2208 5.625 16.8756 5.625Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.125 5.625V4.375C13.125 4.04348 12.9933 3.72554 12.7589 3.49112C12.5245 3.2567 12.2065 3.125 11.875 3.125H8.125C7.79348 3.125 7.47554 3.2567 7.24112 3.49112C7.0067 3.72554 6.875 4.04348 6.875 4.375V5.625" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5006 9.8679C15.2211 11.1867 12.6334 11.8791 9.99998 11.875C7.36696 11.8791 4.77968 11.1869 2.50049 9.86857" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.0625 9.375H10.9375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

