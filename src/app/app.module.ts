import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { PilotService } from './services/pilot.service';
import { CountryService } from './services/country.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddPilotComponent } from './components/add-pilot/add-pilot.component';
import { CountryComponent } from './components/country/country.component';

export const components = [routingComponents, AddPilotComponent, CountryComponent];
export const services = [PilotService, CountryService];
@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [services, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

