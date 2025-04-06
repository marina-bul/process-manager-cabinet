import type { FC } from "react";
import type { IconProps } from "../../types/general";

export const ContractorIcon: FC<IconProps> = ({ className }) => {
  return (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6666 4.6333C13.2298 5.00906 14.6212 5.89953 15.6172 7.16157C16.6133 8.42361 17.156 9.9839 17.1582 11.5916V13.1833M2.84156 13.1833V11.5916C2.83933 9.98276 3.38042 8.42026 4.37716 7.15733C5.3739 5.89439 6.76788 5.00501 8.33323 4.6333" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
    <path d="M17.1583 13.1833H2.84167C1.96261 13.1833 1.25 13.896 1.25 14.775C1.25 15.6541 1.96261 16.3667 2.84167 16.3667H17.1583C18.0374 16.3667 18.75 15.6541 18.75 14.775C18.75 13.896 18.0374 13.1833 17.1583 13.1833Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
    <path d="M12.3834 13.1833H7.6167L8.33232 4.55069C8.3753 4.03221 8.80864 3.6333 9.3289 3.6333H10.6712C11.1914 3.6333 11.6248 4.03221 11.6677 4.55069L12.3834 13.1833Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
  </svg>
  );
};

