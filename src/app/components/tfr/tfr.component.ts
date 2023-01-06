import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { ResourceListType } from 'src/app/types/types';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
  providers: [TfrManagementService],
})
export class TfrComponent implements OnInit {
  TfrId!: Number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected tfrManagementService: TfrManagementService
  ) {}

  ngOnInit() {
    this.TfrId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(this.TfrId)) {
      this.router.navigate(['/home']);
    }
    this.route.paramMap.subscribe((result) => {
      this.TfrId = Number(result.get('id'));
    });
    if (!Number.isInteger(this.TfrId)) {
      this.router.navigate(['/home']);
    }

    //TODO. Add an API call to the backend to fetch the Project Object with
    //the tfr id here.
    this.tfrManagementService.getProjectFromDatabaseByProjectId(this.TfrId);
    // this.tfrManagementService.getResourcesNamesByProjectIdFromDatabase(
    //   this.TfrId
    // );
  }

  redirectToEditTfr() {
    this.router.navigate(['/tfr/' + this.TfrId + '/edit']);
  }
}
