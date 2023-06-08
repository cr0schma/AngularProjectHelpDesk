import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { ViewFavoritesComponent } from './view-favorites/view-favorites.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

const routes: Routes = [
  { path: '', component: ViewTicketsComponent },
  { path: 'ticket-details', component: TicketDetailsComponent},
  { path: 'view-favorites', component: ViewFavoritesComponent },
  { path: 'add-ticket', component: AddTicketComponent },
  { path: 'update-ticket', component: UpdateTicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
