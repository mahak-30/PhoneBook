import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contacts } from '../contacts';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ContactList: contacts[] = [];

  constructor(private router: Router, private userService: ContactsService) { }
  test: string = '';

  ngOnInit() {
    this.userService.getContact()
      .subscribe(data => {
        data.sort((a, b) => { return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1; });
        this.ContactList = data;
      });
  }

  createContact(): void {
    this.router.navigate(['createContact']);
  };

  deleteContact(contacts: contacts): void {
    this.userService.deleteContact(contacts.id)
      .subscribe(data => {
        this.ContactList = this.ContactList.filter(u => u !== contacts);
      })
  };
}
