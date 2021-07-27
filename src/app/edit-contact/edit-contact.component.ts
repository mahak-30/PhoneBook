import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { contacts } from '../contacts';
import { ContactsService } from '../contacts.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactList: contacts[] = [];
  editForm:FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: ContactsService) { }

  ngOnInit(): void {
    let contactId = localStorage.getItem("contactId");
    if (!contactId) {
      alert("Invalid action.")
      this.router.navigate(['updateContact']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      phone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.userService.getContactById(+contactId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

onsubmit() {
  this.submitted = true;
  if (this.editForm.invalid) {
    return;
  }
  this.userService.updateContact(this.editForm.value)
    .pipe(first())						//returns the first value they receive from the source and closes the observable	
    .subscribe(
      data => {
        this.router.navigate(['updateContact']);
      },
      error => {
        alert(error);
      });
}

}
