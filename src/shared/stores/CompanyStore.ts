import { makeAutoObservable, runInAction } from "mobx";
import { apiService } from "../../api/ApiService";

import type { CompanyInfo, ContactInfo, Photo } from "../../types/general";

class CompanyStore {

    private companyId: string = '12';
    private isLoading: boolean = false;

    companyInfo: CompanyInfo | null = null;
    companyName: string = '';
    photos: Photo[] = [];
    contacts: ContactInfo | null = null;

    constructor() {
      makeAutoObservable(this);
    }

    private setContacts(newContacts: ContactInfo) {
        this.contacts = newContacts;
    }

    private setCompanyInfo(newInfo: CompanyInfo) {
      this.companyInfo = newInfo;
    }

    private setPhotos(newPhotos: Photo[]) {
      this.photos = newPhotos;
    }

    private setCompanyName(newName: string) {
      this.companyName = newName;
    }


    getStoreInfo = async () => {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            const company = await apiService.getCompany(this.companyId);
            const contact = await apiService.getContact(company.contactId);
            
            if (!company || !contact) {
                throw new Error('Failed to fetch data');
            }

            runInAction(() => {
              this.setContacts(contact)
              this.setCompanyInfo(company)
              this.setPhotos(company.photos) 
              this.setCompanyName(company.name)
            })
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
        }
    };

    deleteCompanyAction = async () => {
        try {
            const res = await apiService.deleteCompany(this.companyId);
            if (res.status === 200) {
                this.companyInfo = null;
            } else {
                console.error('The server responded with the status', res.status);
            }
        } catch (err) {
            console.error(err);
        }
    };
    
}

export default new CompanyStore()