import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPilotService } from './services/add-pilot.service';
import { CountryService } from './services/country.service';
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteDemoComponent } from './components/route-demo/route-demo.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    RouteDemoComponent,
    routingComponents,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AddPilotService, CountryService, HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
