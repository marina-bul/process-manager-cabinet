export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export type Photo = {
  name: string,
  filepath: string,
  thumbpath: string,
  createdAt: string,
};

export type ContractInfo = {
  no?: string;
  issue_date?: string;
}

export interface CompanyInfoResponse {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: ContractInfo;
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string
}

export type CompanyInfo = Omit<CompanyInfoResponse, 'status' | 'createdAt' | 'updatedAt' | 'contactId'>;

export interface ContactInfoResponse {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string
}

export type ContactInfo = Omit<ContactInfoResponse, 'createdAt' | 'updatedAt'>;
