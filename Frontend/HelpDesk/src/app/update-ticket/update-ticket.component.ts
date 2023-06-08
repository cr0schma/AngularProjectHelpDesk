import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})

export class UpdateTicketComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.userForm = this.formBuilder.group({
      assignee: [''],
      status: [''],
      resolution: [''],
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
      this.apiService.UpdateTicket(this.userForm.value.id, ticket).subscribe(result => {
        console.log(ticket);
      });

      this.userForm.reset();

    }
  }


  // UpdateTicket(id: number, ticketToUpdate: Ticket){
  //   this.apiService.UpdateTicket(id, ticketToUpdate)
  //   .subscribe(result => {
  //     console.log(result);
  //   }); 
  // }



}