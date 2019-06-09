import { Component, OnInit} from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHideSideBar :boolean = false;
  title = 'argon-dashboard-angular';

  constructor(private appService: AppService,
    private router: Router) { }

  onShowSideBarChange(onShowHideSideBar) {
    this.showHideSideBar = onShowHideSideBar;
  }
  ngOnInit() {
    if (!this.appService.authenticated) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
