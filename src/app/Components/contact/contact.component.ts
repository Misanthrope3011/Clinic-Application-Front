import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageSentComponent } from '../Popups/message-sent/message-sent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  submitted = false;
  error = false;
  succes = false;

  get f() { return this.contact.controls; }

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialog: MatDialog) { }

  contact = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    content: new FormControl('')
  });

  ngOnInit(): void {

    this.contact = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', Validators.required]
    });

  }

  sendContactForm() {
    this.submitted = true;
    if (this.contact.invalid)
    {
      this.error = true;
      this.succes = false;
    }
    else {

      this.httpClient.post("http://localhost:8080/contact", this.contact.value)
      .subscribe(log => console.log(log));

      this.contact.reset();
      this.contact.setErrors({ 'invalid': true });
      this.submitted = false;
      this.error = false;
      this.succes = true;
    }
  }

}
