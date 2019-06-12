import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },

    { path: '/employe',       title: 'Employe',       icon: 'ni-planet text-blue', class: '' },
    { path: '/etudiant',      title: 'Etudiant',      icon: 'ni-key-25 text-info', class: '' },
    { path: '/region',        title: 'Region',        icon: 'ni-pin-3 text-orange', class: '' },
    { path: '/profil',        title: 'Profil',        icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/etablissement', title: 'Etablissement', icon: 'ni-bullet-list-67 text-red', class: '' },
    { path: '/ville',         title: 'Ville',         icon: 'ni-pin-3 text-orange', class: '' },
    { path: '/attestation',   title: 'Attestation',   icon: 'ni-planet text-blue', class: '' },
    { path: '/chart',         title: 'Chart',         icon: 'ni-tv-2 text-primary', class: '' },
    
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
