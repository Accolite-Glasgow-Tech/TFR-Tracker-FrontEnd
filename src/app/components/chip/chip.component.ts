import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input('value') value: any;
  isSelected: boolean = false;
  @Output() selectEmitter = new EventEmitter<any>();
  @Output() removeEmitter = new EventEmitter<any>();

  ngOnInit(): void {}
  
  remove(input: any) {
    this.removeEmitter.emit(this.value);
  }
  
  click(event: any) {
    this.selectEmitter.emit(this.value);
  }
}
