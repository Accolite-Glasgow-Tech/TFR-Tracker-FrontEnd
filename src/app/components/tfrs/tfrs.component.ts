import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tfrs',
  templateUrl: './tfrs.component.html',
  styleUrls: ['./tfrs.component.scss'],
})
export class TfrsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
