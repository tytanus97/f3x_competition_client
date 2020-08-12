import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { PilotService } from './services/pilot.service';
import { CountryService } from './services/country.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddPilotComponent } from './components/pilot-components/add-pilot/add-pilot.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PilotComponent } from './components/pilot-components/pilot/pilot.component';
import { EventComponent } from './components/event-components/event/event.component';
import { PlaneComponent } from './components/pilot-components/plane/plane.component';
import { LocationComponent } from './components/location/location.component';
import { AllPilotsComponent } from './components/pilot-components/all-pilots/all-pilots.component';
import { PilotDetailsComponent } from './components/pilot-components/pilot-details/pilot-details.component';
import { FormsModule } from '@angular/forms';
import { PilotPlanesComponent } from './components/pilot-components/pilot-planes/pilot-planes.component';
import { AddPlaneComponent } from './components/pilot-components/add-plane/add-plane.component';
import { EventService } from './services/event.service';
import { LocationService } from './services/location.service';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationHomeComponent } from './components/location-home/location-home.component';
import { HomeComponent } from './components/home/home.component';
import { AutheticationComponent } from './components/authetication/authetication.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PilotProfileComponent } from './components/pilot-components/pilot-profile/pilot-profile.component';
import { UserActionComponent } from './components/user/user-action/user-action.component';



export const services = [ PilotService, CountryService, EventService, LocationService ];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    PlaneComponent,
    LocationComponent,
    AddPilotComponent,
    PilotComponent,
    NavigationComponent,
    AllPilotsComponent,
    PilotDetailsComponent,
    PilotPlanesComponent,
    AddPlaneComponent,
    AddLocationComponent,
    LocationHomeComponent,
    HomeComponent,
    AutheticationComponent,
    PilotProfileComponent,
    UserActionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [services, HttpClient,
  {provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

