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

  async ngOnInit(): Promise<void> {

    // const testTicket: Ticket = {
    //   reporter: 'Bill',
    //   assignee: 'Scott',
    //   status: 'Open',
    //   title: 'API dont work still!!',
    //   resolution: null
    // }

    // const testFavorite: Favorite = {
    //   userId: 'Mac',
    //   ticketNumber : 2
    // }

    // const testUpdateTicket: Ticket = {
    //   reporter: 'Joe',
    //   assignee: 'new name',
    //   status: 'Closed',
    //   title: 'API dont work still!! even now!',
    //   resolution: 'Rebooted server - API works now'
    // }

    //this.GetFavorites();
    //this.GetFavoritesTicketInfo();
    //this.GetFavorite('John Doe');
    //this.AddFavorite(testFavorite);

    //this.getAllTickets();
    //this.AddTicket(testTicket)
    //this.DeleteFavorite(1)
    //this.UpdateTicket(3, testUpdateTicket);
    //this.DeleteTicket(1);

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
    this.apiService.AddFavorite(favoriteToAdd.userId, favoriteToAdd.ticketNumber)
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
