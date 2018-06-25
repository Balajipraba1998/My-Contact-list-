import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactService } from '../shared/contact.service';
import { ToastrService } from 'ngx-toastr';
import { ContactListComponent } from '../contact-list/contact-list.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
/*contactFormName:any;
contactFormRelation:any;
contactFormLocation:any;
contactFormPhone:any;
contact:any;*/
  constructor(private contactService: ContactService,  private tostr: ToastrService) { }

  ngOnInit() {
    
    this.resetForm();
    
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.value.$key == null)
      this.contactService.insertContact(contactForm.value);
    else
      this.contactService.updateContact(contactForm.value);
    this.resetForm(contactForm);
    this.tostr.success('Submitted Succcessfully', 'Contact Register');

  }

  resetForm(contactForm?: NgForm) {
    if (contactForm != null)
      contactForm.reset();
    this.contactService.selectedContact = {
      $key: null,
      name: '',
      relation: '',
      location: '',
      phone: 0, 
    }
  }

}