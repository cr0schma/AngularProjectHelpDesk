import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Ticket } from '../ticket';
import { Favorite } from '../favorite';
import { FavoriteWithTicketInfo } from '../favorite-with-ticket-info';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ticketList: Ticket[] = [];
  favoriteList: Favorite[] = [];
  favoriteWithTicketInfoList: FavoriteWithTicketInfo[] = []

  constructor(private apiService: ApiService){}

  ngOnInit(): void {

    // const testTicket: Ticket = {
    //   Reporter: 'Bill',
    //   Assignee: 'Scott',
    //   Status: 'Open',
    //   Title: 'API dont work still!!',
    //   Resolution: null
    // }

    // const testFavorite: Favorite = {
    //   UserId: 'Mac',
    //   Ticket_Number : 2
    // }

    // const testUpdateTicket: Ticket = {
    //   Reporter: 'Bill',
    //   Assignee: 'Scott',
    //   Status: 'Open',
    //   Title: 'API dont work still!!',
    //   Resolution: 'Rebooted server - API works now'
    // }

    // this.GetFavorites();
    // this.GetFavoritesTicketInfo();
    // this.GetFavorite('John Doe');
    //this.AddFavorite(testFavorite);

    // this.getAllTickets();
    //this.AddTicket(testTicket)
    //this.DeleteFavorite(13)
    //this.UpdateTicket(8, testUpdateTicket);
    //this.DeleteTicket(4);

    this.apiService.GetFavorites()
    .subscribe(result => {
      this.favoriteList = result;
      console.log(result);
    });

    this.apiService.GetFavoritesTicketInfo()
    .subscribe(result => {
      this.favoriteWithTicketInfoList = result;
      console.log(result);
    });

    this.apiService.getAllTickets()
      .subscribe(result => {
        this.ticketList = result;
        console.log(result);
      });

  }

  // GetFavorites(){
  //   return this.apiService.GetFavorites()
  //   .subscribe(result => {
  //     console.log(result);
  //   });  
  // }

  // GetFavoritesTicketInfo(){
  //   return this.apiService.GetFavoritesTicketInfo()
  //   .subscribe(result => {
  //     console.log(result);
  //   });  
  // }

  GetFavorite(reporter: string){
    return this.apiService.GetFavorite(reporter)
    .subscribe(result => {
      console.log(result);
    }); 
  }

  AddFavorite(favoriteToAdd: Favorite){
    this.apiService.AddFavorite(favoriteToAdd.UserId, favoriteToAdd.Ticket_Number)
    .subscribe(result => {
      console.log(favoriteToAdd);
    }); 
  }

  DeleteFavorite(id: number){
    this.apiService.DeleteFavorite(id)
    .subscribe(result => {
    console.log(id);
    }); 
  }

  // getAllTickets() {
  //   return this.apiService.getAllTickets()
  //     .subscribe(result => {
  //       console.log(result);
  //     });    
  // }

  AddTicket(ticketToAdd: Ticket){
    this.apiService.AddTicket(ticketToAdd)
    .subscribe(result => {
      console.log(ticketToAdd);
    }); 
  }

  UpdateTicket(id: number, ticketToUpdate: Ticket){
    this.apiService.UpdateTicket(id, ticketToUpdate)
    .subscribe(result => {
      console.log(result);
    }); 
  }
  
  DeleteTicket(id: number){
    this.apiService.DeleteTicket(id)
    .subscribe(result => {
    console.log(id);
    }); 
  }

}
