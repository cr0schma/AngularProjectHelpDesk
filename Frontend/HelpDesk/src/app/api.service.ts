import { Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { Favorite } from './favorite';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteWithTicketInfo } from './favorite-with-ticket-info';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  //api url may need to be updated
  private readonly url = 'https://localhost:7229/api/'


  GetFavorites(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(this.url + 'Favorite');
  }

  GetFavoritesTicketInfo(): Observable<FavoriteWithTicketInfo[]>{
    return this.http.get<FavoriteWithTicketInfo[]>(this.url + 'Favorite/withTicketInfo');
  }

  GetFavorite(reporter: string): Observable<Favorite>{
    return this.http.get<Favorite>(this.url + 'Favorite/' + reporter);
  }
  
  AddFavorite(reporter: string, ticketNumber: number): Observable<Favorite>{

    const params = new HttpParams()
      .set('reporter', reporter)
      .set('ticketNumber', ticketNumber);

    return this.http.post<Favorite>(this.url + 'Favorite/' + reporter + '/' + ticketNumber, null, { params: params });
  }

  DeleteFavorite(id: number): Observable<Favorite>{
    return this.http.delete<Favorite>(this.url + 'Favorite/' + id);
  }

  getAllTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.url + 'Tickets/AllTickets');
  }

  AddTicket(ticketToAdd: Ticket): Observable<Ticket[]>{
    return this.http.post<Ticket[]>(this.url + 'Tickets/NewTicket', ticketToAdd);
  }

  UpdateTicket(id: number, ticketToUpdate: Ticket): Observable<Ticket> {
    return this.http.patch<Ticket>(this.url + 'Tickets/UpdateTicket/' + id, ticketToUpdate);
  }

  DeleteTicket(id: number): Observable<Ticket>{
    return this.http.delete<Ticket>(this.url + 'Tickets/DeleteTicket/' + id);
  }

}
