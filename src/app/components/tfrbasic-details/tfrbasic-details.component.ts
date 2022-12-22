import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tfrbasic-details',
  templateUrl: './tfrbasic-details.component.html',
  styleUrls: ['./tfrbasic-details.component.scss']
})
export class TFRBasicDetailsComponent implements OnInit {

  constructor() { }

  ///////////////////////////////

  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();

  //////////////////////////////

  tfrDetails!:FormGroup;

  ngOnInit(): void {
    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null)
    })
  }

}
