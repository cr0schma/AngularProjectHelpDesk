import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';
import { FavoriteWithTicketInfo } from '../favorite-with-ticket-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements OnInit {

  userForm: FormGroup;

  ticketList: Ticket[] = [];
  favoriteList: Favorite[] = [];
  favoriteWithTicketInfoList: FavoriteWithTicketInfo[] = []


  tickets: Ticket[] = [];
  ticket: Ticket = {
    id: 0,
    reporter: '',
    assignee: '',
    status: '',
    title: '',
    resolution: '',
  }


  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.userForm = this.formBuilder.group({
      asignee: [''],
      status: [''],
      resolution: ['']
    });

  }
  
    async ngOnInit(): Promise<void> {

      this.getTickets()

      this.apiService.getAllTickets()
        .subscribe(result => {
          this.ticketList = result;
          console.log(result);
        });
    }
  
    routeToUpdateTicket(updateId: number) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          id: updateId
        }
      };
      console.log(navigationExtras)
      this.router.navigate(['/update-ticket'], navigationExtras);
    }

    AddFavorite(reporter: string, id: number){
      this.apiService.AddFavorite(reporter, id)
      .subscribe(result => {
        console.log(result);
      }); 
    }
  
    AddTicket(ticketToAdd: Ticket){
      this.apiService.AddTicket(ticketToAdd)
      .subscribe(result => {
        console.log(ticketToAdd);
      }); 
    }

    getTickets() {
      this.apiService.getAllTickets().subscribe(
        (result: Ticket[]) => {
          this.tickets = result
        }
      );
    }
    getTicket(ticket: Ticket) {
      this.ticket = ticket
      this.router.navigate(['/ticket-details']);
    }

}


