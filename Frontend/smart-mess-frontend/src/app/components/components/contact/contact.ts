import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  submitForm() {
    alert('Thank you! Your message has been submitted.');

    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}