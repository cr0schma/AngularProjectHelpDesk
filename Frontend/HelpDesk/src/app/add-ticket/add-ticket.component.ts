import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.userForm = this.formBuilder.group({
      reporter: ['', Validators.required],
      assignee: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required],
      //resolution: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const ticket: Ticket = this.userForm.value;
      //console.log(ticket);
      
      // handle your user data here...
      this.apiService.AddTicket(ticket).subscribe(result => {
        console.log(ticket);
      });

      this.userForm.reset();

    }
  }

}
