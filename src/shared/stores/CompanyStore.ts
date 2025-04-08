import { makeAutoObservable, runInAction } from "mobx";
import { apiService } from "api/ApiService";

import type { CompanyInfo, ContactInfo, Photo } from "types/general";

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

    private setContacts(newContacts: ContactInfo | null) {
        this.contacts = newContacts;
    }

    private setCompanyInfo(newInfo: CompanyInfo | null) {
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
              runInAction(() => {
                this.setContacts(null)
                this.setCompanyInfo(null)
                this.setPhotos([]) 
                this.setCompanyName('')
              })
            } else {
                console.error('DELETE COMPANY: The server responded with the status ', res.status);
            }
        } catch (err) {
            console.error(err);
        }
    };

    updateCompanyAction = async (data: Partial<CompanyInfo>) => {
      const emptyCompany: CompanyInfo = {
        id: '',
        name: '',
        shortName: '',
        businessEntity: '',
        contract: {
          no: '',
          issue_date: ''
        },
        type: [],
        photos: []
      };

      try {
        const res = await apiService.updateCompany(this.companyId, data);
        if (res.status === 200) {
          runInAction(() => {
            if (!this.companyInfo) {
              const updatedCompanyInfo = {
                ...emptyCompany,
                ...data,
                contract: {...data.contract}
              };
              this.setCompanyInfo(updatedCompanyInfo);
              this.setCompanyName(updatedCompanyInfo.name);
              this.setPhotos(updatedCompanyInfo.photos)
              return;
            }
            
            const updatedCompanyInfo = {
              ...this.companyInfo,
              ...data,
              contract: {...this.companyInfo.contract,...data.contract}
            };
            this.setCompanyInfo(updatedCompanyInfo);
            this.setCompanyName(updatedCompanyInfo.name);
            this.setPhotos(updatedCompanyInfo.photos)
          });
        } else {
          console.error('UPDATE COMPANY: The server responded with the status ', res.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    updateContactsAction = async (data: Partial<ContactInfo>) => {
      const emptyContact: ContactInfo = {
        id: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: ''
      };

      try {
        const res = await apiService.updateContact(this.contacts?.id || '0', data);
        if (res.status === 200) {
          runInAction(() => {
            if (!this.contacts) {
              const updatedContact = {
                ...emptyContact,
                ...data
              };
              this.setContacts(updatedContact);
              return;
            }
            
            const updatedContact = {
              ...this.contacts,
              ...data
            };
            this.setContacts(updatedContact);
          });
        } else {
          console.error('UPDATE CONTACTS: The server responded with the status ', res.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    uploadPhotoAction = async (photo: File) => {
      try {
        const res = await apiService.uploadCompanyImage(this.companyId, photo); 

        if (res.status === 200) {
          this.setPhotos([...this.photos, res.data]);
        } else {
            console.error('DELETE COMPANY: The server responded with the status ', res.status);
        }
      } catch (error) {
            console.error(error); 
      } 
    }

    deletePhotoAction = async (photoName: string) => {
      try {
          const res = await apiService.deleteCompanyImage(this.companyId, photoName);
          if (res.status === 200) {
            this.setPhotos(this.photos.filter(photo => photo.name !== photoName));
          } else {
              console.error('DELETE PHOTO: The server responded with the status ', res.status);
          }
      } catch (err) {
          console.error(err);
      }
  };
    
}

export default new CompanyStore()