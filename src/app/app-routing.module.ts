import { ManageEventComponent } from './components/event-components/manage-event/manage-event.component';
import { EventResolverService } from './resolvers/event/event-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPilotComponent } from './components/pilot-components/add-pilot/add-pilot.component';
import { PilotComponent } from './components/pilot-components/pilot/pilot.component';
import { PlaneComponent } from './components/pilot-components/plane/plane.component';
import { AllPilotsComponent } from './components/pilot-components/all-pilots/all-pilots.component';
import { PilotDetailsComponent } from './components/pilot-components/pilot-details/pilot-details.component';
import { PilotPlanesComponent } from './components/pilot-components/pilot-planes/pilot-planes.component';
import { HomeComponent } from './components/home/home.component';
import { AutheticationComponent } from './components/authetication/authetication.component';
import { PilotProfileComponent } from './components/pilot-components/pilot-profile/pilot-profile.component';
import { PilotHomeComponent } from './components/pilot-components/pilot-home/pilot-home.component';
import { EventsComponent } from './components/event-components/events/events.component';
import { EventHomeComponent } from './components/event-components/event-home/event-home.component';
import { AddEventComponent } from './components/event-components/add-event/add-event.component';
import { AuthGuard } from './shared/auth.guard';
import { LocationComponent } from './components/location-components/location/location.component';
import { LocationHomeComponent } from './components/location-components/location-home/location-home.component';
import { AddLocationComponent } from './components/location-components/add-location/add-location.component';
import { LocationDetailsComponent } from './components/location-components/location-details/location-details.component';
import { SearchEventComponent } from './components/event-components/search-event/search-event.component';
import { EventDetailsComponent } from './components/event-components/event-details/event-details.component';
import { EventPilotsComponent } from './components/event-components/event-pilots/event-pilots.component';
import { EventStatsComponent } from './components/event-components/event-stats/event-stats.component';
import { EventRoundsComponent } from './components/event-components/event-rounds/event-rounds.component';



const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: AutheticationComponent
  },
  {
    path: 'pilots',component: PilotComponent,
    children: [ 
      { path: 'home', component: PilotHomeComponent },
      { path: 'allPilots', component: AllPilotsComponent },
      { path: 'pilotProfile', component: PilotProfileComponent },
      { path: 'pilotDetails', component: PilotDetailsComponent },
      { path: 'pilotPlanes', component: PilotPlanesComponent }
    ]
  },
  { path: 'register', component: AddPilotComponent },
  { path: 'planes', component: PlaneComponent },

  {
    path: 'events', component: EventsComponent,
    children: [
      { path: 'home', component: EventHomeComponent },
      { path: 'addEvent', component: AddEventComponent, canActivate: [AuthGuard] },
      { path: 'searchEvent', component: SearchEventComponent },
      {
        path: 'eventDetails', component: EventDetailsComponent, resolve: { currentEvent: EventResolverService },
        children: [
          { path: '',pathMatch: 'full',redirectTo: 'eventPilots'},
          { path: 'eventPilots', component: EventPilotsComponent },
          { path: 'eventStats', component: EventStatsComponent },
          { path: 'eventRounds', component: EventRoundsComponent }
        ]
      },
      { path: 'manageEvent', component: ManageEventComponent, resolve: { currentEvent: EventResolverService }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'locations', component: LocationComponent,
    children: [
      { path: 'home', component: LocationHomeComponent },
      { path: 'locationForm', component: AddLocationComponent, canActivate: [AuthGuard] },
      { path: 'locationDetails', component: LocationDetailsComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddPilotComponent, PilotComponent];
