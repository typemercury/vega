//services
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './components/shared/pagination.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProgressService } from './services/progress.service';

//modules
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import * as Raven from 'raven-js';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ChartModule } from 'angular2-chartjs';

//components
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { AdminComponent } from './components/admin/admin/admin.component';


Raven
    .config('https://53a4964cadee40b58017075777c75fa2@sentry.io/1191166')
    .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent
    ],
    imports: [        
        CommonModule,
        ToastyModule.forRoot(), 
        HttpModule,
        FormsModule,
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles', component: VehicleListComponent},
            // { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AdminAuthGuardService ] },
            { path: 'vehicles/new', component: VehicleFormComponent},
            // { path: 'vehicles/eidt/:id', component: VehicleFormComponent, canActivate: [ AdminAuthGuardService ] },
            { path: 'vehicles/eidt/:id', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: ViewVehicleComponent},
            { path: 'home', component: HomeComponent },
            // { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuardService ] },
            { path: 'admin', component: AdminComponent},
            // { path: 'counter', component: CounterComponent },
            // { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler},
        VehicleService,
        PhotoService,
        AuthService,
        AuthGuardService,
        AdminAuthGuardService,
        AUTH_PROVIDERS
    ]
})
export class AppModuleShared {
}
