import { HttpErrorResponse } from '@angular/common/http';
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
    } else {
      this.route.paramMap.subscribe((result) => {
        this.TfrId = Number(result.get('id'));
      });
      this.route.data.subscribe(({ project }) => {
        this.tfrManagementService.project = project;
        this.tfrManagementService.cleanProjectObject();
      });
    }
  }

  redirectToEditTfr() {
    this.router.navigate(['/tfr/' + this.TfrId + '/edit']);
  }
}
