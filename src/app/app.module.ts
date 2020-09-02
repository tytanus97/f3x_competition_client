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
import { PlaneComponent } from './components/pilot-components/plane/plane.component';
import { AllPilotsComponent } from './components/pilot-components/all-pilots/all-pilots.component';
import { PilotDetailsComponent } from './components/pilot-components/pilot-details/pilot-details.component';
import { FormsModule } from '@angular/forms';
import { PilotPlanesComponent } from './components/pilot-components/pilot-planes/pilot-planes.component';
import { AddPlaneComponent } from './components/pilot-components/add-plane/add-plane.component';
import { EventService } from './services/event.service';
import { LocationService } from './services/location.service';
import { HomeComponent } from './components/home/home.component';
import { AutheticationComponent } from './components/authetication/authetication.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PilotProfileComponent } from './components/pilot-components/pilot-profile/pilot-profile.component';
import { UserActionComponent } from './components/user/user-action/user-action.component';
import { PilotHomeComponent } from './components/pilot-components/pilot-home/pilot-home.component';
import { EventHomeComponent } from './components/event-components/event-home/event-home.component';
import { EventsComponent } from './components/event-components/events/events.component';
import { AddEventComponent } from './components/event-components/add-event/add-event.component';
import { LocationComponent } from './components/location-components/location/location.component';
import { AddLocationComponent } from './components/location-components/add-location/add-location.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LocationHomeComponent } from './components/location-components/location-home/location-home.component';
import { LocationDetailsComponent } from './components/location-components/location-details/location-details.component';
import { ClickedOutsideDirective } from './shared/clicked-outside.directive';
import { FilterLocationsPipe } from './shared/filter-locations.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchEventComponent } from './components/event-components/search-event/search-event.component';
import { EventDetailsComponent } from './components/event-components/event-details/event-details.component';
import { ManageEventComponent } from './components/event-components/manage-event/manage-event.component';
import { EventTableComponent } from './components/event-components/manage-event/event-table/event-table/event-table.component';
import { AddRoundComponent } from './components/round-components/add-round/add-round/add-round.component';
import { SortTotalPipe } from './shared/sort-total.pipe';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';





export const services = [ PilotService, CountryService, EventService, LocationService ];

@NgModule({
  declarations: [
    AppComponent,
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
    HomeComponent,
    AutheticationComponent,
    PilotProfileComponent,
    UserActionComponent,
    PilotHomeComponent,
    EventHomeComponent,
    EventsComponent,
    LocationHomeComponent,
    AddEventComponent,
    LocationDetailsComponent,
    ClickedOutsideDirective,
    FilterLocationsPipe,
    SearchEventComponent,
    EventDetailsComponent,
    ManageEventComponent,
    EventTableComponent,
    AddRoundComponent,
    SortTotalPipe

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [services, HttpClient,
  {provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

