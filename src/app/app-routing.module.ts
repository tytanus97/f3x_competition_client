import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPilotComponent } from './components/add-pilot/add-pilot.component';
import { CountryComponent } from './components/country/country.component';
import { PilotComponent } from './components/pilot/pilot.component';
import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { PlaneComponent } from './components/plane/plane.component';
import { LocationComponent } from './components/location/location.component';



const routes: Routes = [
  {path: 'pilots', component: PilotComponent},
  {path: 'pilotForm', component: AddPilotComponent},
  {path: 'events', component: EventComponent },
  {path: 'planes', component: PlaneComponent },
  {path: 'locations', component: LocationComponent },
  {path: '', redirectTo: 'pilots', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddPilotComponent, CountryComponent, PilotComponent];
