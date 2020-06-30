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
import { NavigationComponent } from './components/navigation/navigation.component';
import { PilotComponent } from './components/pilot/pilot.component';
import { EventComponent } from './components/event/event.component';
import { PlaneComponent } from './components/plane/plane.component';
import { LocationComponent } from './components/location/location.component';



export const services = [ PilotService, CountryService, ];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    PlaneComponent,
    LocationComponent,
    AddPilotComponent,
    PilotComponent,
    CountryComponent,
    NavigationComponent

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

