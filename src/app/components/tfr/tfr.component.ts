import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
})
export class TfrComponent implements OnInit {
  TfrId!: Number;
  constructor(private route: ActivatedRoute, private router: Router) {}

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
  }
}
