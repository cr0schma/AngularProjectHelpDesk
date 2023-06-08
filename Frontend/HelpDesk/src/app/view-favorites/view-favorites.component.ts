import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';
import { FavoriteWithTicketInfo } from '../favorite-with-ticket-info';

@Component({
  selector: 'app-view-favorites',
  templateUrl: './view-favorites.component.html',
  styleUrls: ['./view-favorites.component.css']
})
export class ViewFavoritesComponent {

  favoriteList: Favorite[] = [];
  favoriteWithTicketInfoList: FavoriteWithTicketInfo[] = []


  // tickets: Ticket[] = [];
  // ticket: Ticket = {
  //   reporter: '',
  //   assignee: '',
  //   status: '',
  //   title: '',
  //   resolution: ''
  // }
  
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
  
      // this.apiService.getAllTickets()
      //   .subscribe(result => {
      //     this.ticketList = result;
      //     console.log(result);
      //   });
  
    }

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
    
    // getTickets() {
    //   this.apiService.getAllTickets().subscribe(
    //     (result: Ticket[]) => {
    //       this.tickets = result
    //     }
    //   );
    // }
    // getTicket(ticket: Ticket) {
    //   this.ticket = ticket
    // }

}
  