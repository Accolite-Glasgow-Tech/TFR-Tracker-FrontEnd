
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tfrService } from 'src/app/service/tfrs/tfr.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';



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
  statusList:any=['DRAFT','INPROGRESS','ARCHIVED','DELIVERED']
  selectedStatus:any
  startAfterDate:any=new FormControl();
  endBeforeDate:any=new FormControl();
  
  
  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    setTimeout( () => {this.projectList.paginator = this.paginator;
                       this.projectList.sort =this.sort;
                      })
    // this.projectList.paginator = this.paginator;
    // this.projectList.sort = this.sort;
  }

  announceSortChange(sortState:Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  projectPostBody:any={};

  constructor(private tfrService:tfrService,private _liveAnnouncer: LiveAnnouncer){

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
        //console.log(allVendors)
      }
    )
  }
  
  getProjects():void{
    this.projectPostBody={}
    if(this.startAfterDate.value!=undefined){
      this.projectPostBody["start_date_after"]=this.getDateString(this.startAfterDate)+" 00:00:00";
    }
    if(this.endBeforeDate.value!=undefined){
      this.projectPostBody["end_date_before"]=this.getDateString(this.endBeforeDate)+" 23:59:59"
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

  getDateString(date:any){
    var year = date.value.getFullYear();
    var month = date.value.getMonth()+1;
    var day = date.value.getDate();
    if(month>=1&&month<=9){
      month="0"+month;
    }
    if(day>=1&&day<=9){
      day="0"+day;
    }
    return year+'-'+month+'-'+day

  }
}
