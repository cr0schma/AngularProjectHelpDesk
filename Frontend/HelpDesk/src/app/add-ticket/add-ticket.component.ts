import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.userForm = this.formBuilder.group({
      reporter: ['', Validators.required],
      assignee: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    if (this.userForm.valid) {

      const ticket: Ticket = this.userForm.value;

      this.apiService.AddTicket(ticket).subscribe(result => {
        console.log(ticket);
      });

      this.router.navigate(['']);                                        
    }
  }

}
