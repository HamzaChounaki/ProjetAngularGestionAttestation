import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { RegionComponent } from '../../pages/region/region.component';
import { AttestationComponent } from '../../pages/attestation/attestation.component';
import { EmployeComponent } from '../../pages/employe/employe.component';
import { EtablissementComponent } from '../../pages/etablissement/etablissement.component';
import { EtudiantComponent } from '../../pages/etudiant/etudiant.component';
import { ProfilComponent } from '../../pages/profil/profil.component';
import { VilleComponent } from '../../pages/ville/ville.component';
import { ChartComponent } from '../../pages/chart/chart.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    RegionComponent,
    AttestationComponent,
    EmployeComponent,
    EtablissementComponent,
    EtudiantComponent,
    ProfilComponent,
    VilleComponent,
    ChartComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
