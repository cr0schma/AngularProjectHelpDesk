import { Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { Favorite } from './favorite';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, map, switchMap } from 'rxjs';
import { FavoriteWithTicketInfo } from './favorite-with-ticket-info';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  //api url needs to be updated
  private readonly url = 'https://localhost:7229/api/'


  GetFavorites(){
    return this.http.get<Favorite[]>(this.url + 'Favorite');
  }

  GetFavoritesTicketInfo(){
    return this.http.get<FavoriteWithTicketInfo[]>(this.url + 'Favorite/withTicketInfo');
  }

  GetFavorite(reporter: string){
    return this.http.get<Favorite>(this.url + 'Favorite/' + reporter);
  }

  AddFavorite(reporter: string, ticketNumber: number){

    const params = new HttpParams()
      .set('reporter', reporter)
      .set('ticketNumber', ticketNumber);

    return this.http.post(this.url + 'Favorite/' + reporter + '/' + ticketNumber, null, { params: params });
  }
  
  DeleteFavorite(id: number){
    return this.http.delete(this.url + 'Favorite/' + id);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url + 'Tickets/AllTickets');
  }

  AddTicket(ticketToAdd: Ticket){
    return this.http.post(this.url + 'Tickets/NewTicket', ticketToAdd);
  }

  UpdateTicket(id: number, ticketToUpdate: Ticket) {
    return this.http.patch(this.url + 'Tickets/UpdateTicket/' + id, ticketToUpdate);
  }

  DeleteTicket(id: number){
    return this.http.delete(this.url + 'Tickets/DeleteTicket/' + id);
  }

}
