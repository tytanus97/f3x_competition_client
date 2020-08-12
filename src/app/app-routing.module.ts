import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPilotComponent } from './components/pilot-components/add-pilot/add-pilot.component';
import { PilotComponent } from './components/pilot-components/pilot/pilot.component';
import { EventComponent } from './components/event-components/event/event.component';
import { PlaneComponent } from './components/pilot-components/plane/plane.component';
import { LocationComponent } from './components/location/location.component';
import { AllPilotsComponent } from './components/pilot-components/all-pilots/all-pilots.component';
import { PilotDetailsComponent } from './components/pilot-components/pilot-details/pilot-details.component';
import { PilotPlanesComponent } from './components/pilot-components/pilot-planes/pilot-planes.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationHomeComponent } from './components/location-home/location-home.component';
import { HomeComponent } from './components/home/home.component';
import { AutheticationComponent } from './components/authetication/authetication.component';
import { PilotProfileComponent } from './components/pilot-components/pilot-profile/pilot-profile.component';



const routes: Routes = [
{
  path: 'home', component: HomeComponent
},
{
  path: 'login', component: AutheticationComponent
},
  {
    path: 'pilots', component: PilotComponent,
    children: [
      { path: 'allPilots', component: AllPilotsComponent },
      { path: 'pilotProfile', component: PilotProfileComponent },
      { path: 'pilotDetails', component: PilotDetailsComponent },
      { path: 'pilotPlanes', component: PilotPlanesComponent }
    ]
  },
  { path: 'register', component: AddPilotComponent },
  { path: 'update', component: AddPilotComponent },
  { path: 'events', component: EventComponent },
  { path: 'planes', component: PlaneComponent },
  {
    path: 'locations', component: LocationComponent,
    children: [
      {path: 'home', component: LocationHomeComponent},
      {path: 'locationForm', component: AddLocationComponent}
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddPilotComponent, PilotComponent];
