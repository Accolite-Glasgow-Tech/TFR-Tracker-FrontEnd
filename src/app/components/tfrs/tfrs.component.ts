import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tfrService } from 'src/app/service/tfrs/tfr.service';
import { dateFormat, statusList } from 'src/app/shared/constants';
import { ProjectDTO } from 'src/app/shared/interfaces';

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
  selectedVendorName: any;
  vendors: any;
  statusList = statusList;
  selectedStatus: any;
  startAfterDate: any = new FormControl();
  endBeforeDate: any = new FormControl();
  pageSize = [3, 5, 10, 15];
  dateFormat = dateFormat;

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
    private tfrService: tfrService,
    private liveAnnouncer: LiveAnnouncer,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.tfrService.getAllProjects().subscribe((allProjects) => {
      this.projectList.data = allProjects;
    });
    this.tfrService.getAllVendors().subscribe((allVendors) => {
      this.vendors = allVendors;
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
    if (this.selectedVendorName != undefined) {
      this.projectPostBody['vendor_name'] = this.selectedVendorName;
    }
    if (this.selectedStatus != undefined) {
      this.projectPostBody['status'] = this.selectedStatus;
    }
    this.tfrService.getProjects(this.projectPostBody).subscribe((projects) => {
      this.projectList.data = projects;
    });
  }

  displayDate(date:Date){
    return this.datePipe.transform(date,'MM/dd/yyyy')
  }
}
