import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Contact} from './contact.model';
@Injectable()
export class ContactService {
  contactList: AngularFireList<any>;
  selectedContact: Contact = new Contact();
  constructor(private firebase :AngularFireDatabase ) { }

  getData(){
    this.contactList = this.firebase.list('contacts');
    return this.contactList;
  }

  insertContact(contact)
  {
    this.contactList.push({
      name: contact.name,
      relation: contact.relation,
      location: contact.location,
      phone: contact.phone
    });
  }

  updateContact(contact : Contact){
    this.contactList.update(contact.$key,
      {
        name: contact.name,
        relation: contact.relation,
        location: contact.location,
        phone: contact.phone
      });
  }

  deleteContact($key : string){
    this.contactList.remove($key);
  }

}
