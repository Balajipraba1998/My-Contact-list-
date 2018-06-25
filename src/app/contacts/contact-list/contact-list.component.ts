import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact.model';
import { ToastrService } from 'ngx-toastr';
import { ContactComponent } from '../contact/contact.component';
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

  onEdit( contact: Contact) {
    this.contactService.selectedContact = Object.assign({}, contact);
  }

  onDelete(contact: Contact) { 
    if (confirm('Are you sure to delete this record ?') == true) {
      var key= contact.$key;
      this.contactService.deleteContact(key);
         
      this.tostr.warning("Deleted Successfully", "Contact register");
    }
  }

}
