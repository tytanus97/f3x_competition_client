import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPilotComponent } from './components/add-pilot/add-pilot.component';
import { CountryComponent } from './components/country/country.component';
import { PilotComponent } from './components/pilot/pilot.component';
import { EventComponent } from './components/event/event.component';
import { PlaneComponent } from './components/plane/plane.component';
import { LocationComponent } from './components/location/location.component';
import { AllPilotsComponent } from './components/all-pilots/all-pilots.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';
import { PilotPlanesComponent } from './components/pilot-planes/pilot-planes.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationHomeComponent } from './components/location-home/location-home.component';



const routes: Routes = [
  {
    path: 'pilots', component: PilotComponent,
    children: [
      { path: 'allPilots', component: AllPilotsComponent },
      { path: 'pilotDetails', component: PilotDetailsComponent },
      { path: 'pilotPlanes', component: PilotPlanesComponent }
    ]
  },
  { path: 'pilotForm', component: AddPilotComponent },
  { path: 'events', component: EventComponent },
  { path: 'planes', component: PlaneComponent },
  {
    path: 'locations', component: LocationComponent,
    children: [
      {path: 'home', component: LocationHomeComponent},
      {path: 'locationForm', component: AddLocationComponent}
    ]
  },
  { path: '', redirectTo: 'pilots', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddPilotComponent, CountryComponent, PilotComponent];
