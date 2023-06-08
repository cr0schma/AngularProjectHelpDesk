import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { Ticket } from '../ticket';
import { ApiService } from '../api.service';
import { FavoriteWithTicketInfo } from '../favorite-with-ticket-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    resolution: ''
  }
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.userForm = this.formBuilder.group({
      asignee: [''],
      status: [''],
      resolution: ['']
    });
  }
  
    async ngOnInit(): Promise<void> {

      this.getTickets()
  
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
  
    // AddFavorite(favoriteToAdd: Favorite){
    //   this.apiService.AddFavorite(favoriteToAdd.userId, favoriteToAdd.ticketNumber)
    //   .subscribe(result => {
    //     console.log(favoriteToAdd);
    //   }); 
    // }

    AddFavorite(reporter: string, id: number){
      this.apiService.AddFavorite(reporter, id)
      .subscribe(result => {
        console.log(result);
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
  

    // saveForm(): void {
    //   const updatedTicket: Ticket = {
    //     id: this.userForm.value.id,
    //     reporter: this.userForm.value.reporter,
    //     assignee: this.userForm.value.asignee,
    //     status: this.userForm.value.status,
    //     title: this.userForm.value.title,
    //     resolution: this.userForm.value.resolution,
    //   };
  
    //   this.apiService.UpdateTicket(this.userForm.value.id, updatedTicket).subscribe(result => {
    //     console.log(updatedTicket);
    //   }); 
  
    //   this.userForm.reset();
    //   //this.router.navigate(['/']);
    // }



    // onSubmit() {
    //   if (this.userForm.valid) {
    //     const ticket: Ticket = this.userForm.value;
    //     //console.log(ticket);
        
    //     // handle your user data here...
    //     this.apiService.AddTicket(ticket).subscribe(result => {
    //       console.log(ticket);
    //     });
  
    //     this.userForm.reset();
  
    //   }
    // }




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

    getTickets() {
      this.apiService.getAllTickets().subscribe(
        (result: Ticket[]) => {
          this.tickets = result
        }
      );
    }
    getTicket(ticket: Ticket) {
      this.ticket = ticket
    }


}


