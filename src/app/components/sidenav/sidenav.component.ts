import { Component, Input, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(private sidenavToggleService: SidenavToggleService) {}
  @Input()
  isOpen = false;
  ngOnInit(): void {
    this.sidenavToggleService.toggleEmitter.subscribe(() => {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    });
  }
  RoutesList = RoutesService.RoutesList;
}
