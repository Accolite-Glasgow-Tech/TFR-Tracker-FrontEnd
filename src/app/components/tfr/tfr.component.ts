import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
})
export class TfrComponent implements OnInit {
  TfrId!: String | null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.TfrId = this.route.snapshot.paramMap.get('id');
  }
}
