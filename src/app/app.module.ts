// Created by: Jean-Marie Alder on 9 November 2023
// Updated by: JMA on 10.12.23

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { PlantAddComponent } from './components/plant-add/plant-add.component';
import { PlantFormComponent } from './components/plant-components/plant-form/plant-form.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantModifyComponent } from './components/plant-modify/plant-modify.component';
import { RealtimeDataComponent } from './components/realtime-data/realtime-data.component';

import { ToastrModule } from 'ngx-toastr';
import { PlantInfoComponent } from './components/plant-info/plant-info.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { PlantWeatherInfoComponent } from './components/plant-weather-info/plant-weather-info.component';
import { MaintenanceModeComponent } from './components/maintenance-mode/maintenance-mode/maintenance-mode.component';

/**
 * Initializes and returns keycloak configuration
 * @param keycloak KeycloakService
 * @returns Keycloak configuration
 */
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8888/',
        realm: 'thingy-orange',
        clientId: 'frontend'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    RealtimeDataComponent,
    PlantListComponent,
    PlantDetailComponent,
    PlantAddComponent,
    PlantFormComponent,
    PlantModifyComponent,
    HistoricalDataComponent,
    PlantInfoComponent,
    MapComponent,
    HeaderComponent,
    MaintenanceModeComponent,
    PlantWeatherInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
