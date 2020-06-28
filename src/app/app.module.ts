import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPilotComponent } from './components/add-pilot/add-pilot.component';
import { AddPilotService } from './services/add-pilot.service';
import { CountryService } from './services/country.service';
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AddPilotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [AddPilotService, CountryService, HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
