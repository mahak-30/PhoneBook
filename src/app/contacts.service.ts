import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contacts } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:3000/contacts';
	
    getContact(){					
      return this.http.get<contacts[]>(this.baseUrl);					
    }					
            				
    getContactById(id: number){					
      return this.http.get<contacts>(this.baseUrl+'/'+id);					
    }			
					
    getContactByLastName(lastName:string){					
        return this.http.get<contacts>(this.baseUrl+'/'+lastName);					
      }			
            				
    createContact(contacts:contacts) {					
      return this.http.post(this.baseUrl,contacts);					
    }		
  							
    updateContact(contacts:contacts) {					
        return this.http.put(this.baseUrl + '/' +contacts.id, contacts);					
      }		   
				
    deleteContact(id: number) {					
      return this.http.delete(this.baseUrl + '/' + id);					
    }
}
