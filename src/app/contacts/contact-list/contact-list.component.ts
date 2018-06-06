import { Component, OnInit } from '@angular/core';

import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];
  constructor(private contactService: ContactService, private tostr: ToastrService) { }

  ngOnInit() {
    var x = this.contactService.getData();
    x.snapshotChanges().subscribe(item => {
      this.contactList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.contactList.push(y as Contact);
      });
    });
  }

  onEdit(emp: Contact) {
    this.contactService.selectedContact = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.contactService.deleteContact(key);
      this.tostr.warning("Deleted Successfully", "Contact register");
    }
  }

}
