import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { ViewFavoritesComponent } from './view-favorites/view-favorites.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ViewTicketsComponent,
    ViewFavoritesComponent,
    AddTicketComponent,
    UpdateTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
