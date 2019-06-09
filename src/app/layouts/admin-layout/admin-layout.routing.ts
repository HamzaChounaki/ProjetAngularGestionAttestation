import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { RegionComponent } from '../../pages/region/region.component';

import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { EmployeComponent } from '../../pages/employe/employe.component';
import { EtudiantComponent } from '../../pages/etudiant/etudiant.component';
import { EtablissementComponent } from '../../pages/etablissement/etablissement.component';
import { ProfilComponent } from '../../pages/profil/profil.component';
import { ChartComponent } from '../../pages/chart/chart.component';
import { AttestationComponent } from '../../pages/attestation/attestation.component';
import { VilleComponent } from '../../pages/ville/ville.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },

    { path: 'region',       component: RegionComponent },
    { path: 'employe',      component: EmployeComponent },
    { path: 'profil',       component: ProfilComponent },
    { path: 'etudiant',     component: EtudiantComponent },
    { path: 'etablissement',component: EtablissementComponent },
    { path: 'attestation',  component: AttestationComponent },
    { path: 'ville',        component: VilleComponent },
    { path: 'chart',        component: ChartComponent },

    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables',       component: TablesComponent },
    { path: 'icons',        component: IconsComponent },
    { path: 'maps',         component: MapsComponent }
];
