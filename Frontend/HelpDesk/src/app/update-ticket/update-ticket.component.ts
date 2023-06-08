import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})

export class UpdateTicketComponent implements OnInit {
  updateId!: number; //maybe incorrect way to handle this
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      assignee: [''],
      status: [''],
      resolution: ['']
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.updateId = +params['id'];
    });

  }

  onSubmit() {
    if (this.userForm.valid) {
      
      const ticket: Ticket = this.userForm.value;

      this.apiService.UpdateTicket(this.updateId, ticket).subscribe(result => {
        console.log(ticket);
      });

      this.router.navigate(['']);
    }
  }

}