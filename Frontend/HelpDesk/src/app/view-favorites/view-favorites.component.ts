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
  
    constructor(private apiService: ApiService){}

    async ngOnInit(): Promise<void> {
  
      this.apiService.GetFavoritesTicketInfo()
      .subscribe(result => {
        this.favoriteWithTicketInfoList = result;
        console.log(result);
      });
  
    }

}
  