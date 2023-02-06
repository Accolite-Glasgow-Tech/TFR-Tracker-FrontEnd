import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ApiService } from 'src/app/services/api/api.service';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { statusList } from 'src/app/shared/constants';
import { ProjectDTO } from 'src/app/shared/interfaces';
import { getPDFReportURL } from 'src/app/shared/utils';

@Component({
  selector: 'app-tfrs',
  templateUrl: './tfrs.component.html',
  styleUrls: ['./tfrs.component.scss'],
})
export class TfrsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'start_date',
    'end_date',
    'status',
    'link',
  ];

  ELEMENT_DATA: any = [];
  projectList: MatTableDataSource<ProjectDTO> = new MatTableDataSource(
    this.ELEMENT_DATA
  );
  selectedClientName: any;
  clients: any;
  statusList = statusList;
  selectedStatus: any;
  startAfterDate: any = new FormControl();
  endBeforeDate: any = new FormControl();
  pageSize = [3, 5, 10, 15];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
      
    setTimeout(() => {
      this.projectList.paginator = this.paginator;
      this.projectList.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  projectPostBody: any = {};

  constructor(
    private ApiService: ApiService,
    private liveAnnouncer: LiveAnnouncer,
    private datePipe: DatePipe,
    private router: Router,
    private http: HttpClient,
    public dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.ApiService.getAllProjects().subscribe((allProjects) => {
      this.projectList.data = allProjects;
    });
    this.ApiService.getAllClients().subscribe((allClients) => {
      this.clients = allClients;
    });
  }

  getProjects(): void {
    this.projectPostBody = {};
    if (this.startAfterDate.value != undefined) {
      this.projectPostBody['start_date_after'] = this.datePipe.transform(
        this.startAfterDate.value,
        'yyyy-MM-dd 00:00:00'
      );
    }
    if (this.endBeforeDate.value != undefined) {
      this.projectPostBody['end_date_before'] = this.datePipe.transform(
        this.endBeforeDate.value,
        'yyyy-MM-dd 23:59:59'
      );
    }
    if (this.selectedClientName != undefined) {
      this.projectPostBody['client_name'] = this.selectedClientName;
    }
    if (this.selectedStatus != undefined) {

      this.projectPostBody['status'] = this.selectedStatus==='IN PROGRESS'? 'IN_PROGRESS':this.selectedStatus;
      
    }
    this.ApiService.searchProjects(this.projectPostBody).subscribe(
      (projects) => {
        this.projectList.data = projects;
      }
    );
  }

  viewTFRDetails(tfrId: number): void {
    this.router.navigateByUrl(`/tfr/${tfrId}`);
  }

  download(project: ProjectDTO): void {
    this.http
      .get(getPDFReportURL(project.id!), { responseType: 'blob' })
      .subscribe((data) => {
        FileSaver.saveAs(
          data,
          `${project.name}_Report_${this.datePipe.transform(
            new Date(),
            'yyyy-MM-ddThh:mm'
          )}.pdf`
        );
      });
  }

  scheduleReports(tfrId: number): void {
    this.router.navigateByUrl(`/tfr/${tfrId}/reports`);
  }

  displayDate(date: Date) {
    return this.dateFormatterService.getShortDisplayDate(date);
  }
}
