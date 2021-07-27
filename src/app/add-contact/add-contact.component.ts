import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addForm: FormGroup;							
  submitted: boolean = false;							
                
              
  constructor(private formBuilder: FormBuilder, private router: Router, 							
    private userService: ContactsService) { }							
              
  ngOnInit() {							
    this.addForm = this.formBuilder.group({							
      id:[],							
      firstName: ['', Validators.required],							
      lastName:['', Validators.required],							
      phone: ['', Validators.required]							
    });							
              
  }							
              
  onSubmit() {							
    this.submitted = true;							
    if(this.addForm.invalid){							
      return;							
    }							
    this.userService.createContact(this.addForm.value)							
      .subscribe( data => {							
        // this.router.navigate(['createContact']);			
        this.router.navigate(['home']);					
      });							
  }
}
