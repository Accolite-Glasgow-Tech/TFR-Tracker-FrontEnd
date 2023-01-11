
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tfrService } from 'src/app/service/tfrs/tfr.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { getDateString } from 'src/app/utils/util';
import { dateFormat, statusList } from 'src/app/constant/constant';



export interface PeriodicElement {
  id: String;
  name: String;
  vendor_id: String;
  start_date: String;
  end_date:String;
  status:String;
  version:String;
  vendor_specific:String;
  is_deleted:String;
  created_by:String;
  modified_by:String;
  created_at:String;
  modified_at:String
}

@Component({
  selector: 'app-tfrs',
  templateUrl: './tfrs.component.html',
  styleUrls: ['./tfrs.component.scss'],
})
export class TfrsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'start_date', 'end_date','status' ,'link'];
  ELEMENT_DATA:any=[];
  projectList:MatTableDataSource<PeriodicElement>=new MatTableDataSource(this.ELEMENT_DATA)
  selectedVendorName:any;
  vendors:any
  statusList=statusList
  selectedStatus:any
  startAfterDate:any=new FormControl();
  endBeforeDate:any=new FormControl();
  pageSize=[3,5,10,15]
  dateFormat = dateFormat
  
  
  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    setTimeout( () => {this.projectList.paginator = this.paginator;
                       this.projectList.sort =this.sort;
                      })
  }

  announceSortChange(sortState:Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  projectPostBody:any={};

  constructor(private tfrService:tfrService,private liveAnnouncer: LiveAnnouncer){

  }

  ngOnInit(): void {
    this.tfrService.getAllProjects().subscribe(
      (allProjects)=>{
        this.projectList.data=allProjects
      }
    )
    this.tfrService.getAllVendors().subscribe(
      (allVendors)=>{
        this.vendors=allVendors;
      }
    )
  }
  
  getProjects():void{
    this.projectPostBody={}
    if(this.startAfterDate.value!=undefined){
      this.projectPostBody["start_date_after"]=getDateString(this.startAfterDate)+" 00:00:00";
    }
    if(this.endBeforeDate.value!=undefined){
      this.projectPostBody["end_date_before"]=getDateString(this.endBeforeDate)+" 23:59:59"
    }
    if(this.selectedVendorName!=undefined){
      this.projectPostBody["vendor_name"]=this.selectedVendorName;
    }
    if(this.selectedStatus!=undefined){
      this.projectPostBody["status"]=this.selectedStatus;
    }
    this.tfrService.getProjects(this.projectPostBody).subscribe(
      (projects)=>{
         this.projectList.data = projects;
      }
    ) 
  }
}
