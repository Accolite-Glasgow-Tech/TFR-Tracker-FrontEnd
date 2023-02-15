import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MilestoneDTO } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input('value') value!: MilestoneDTO;
  isSelected: boolean = false;
  @Output() selectEmitter = new EventEmitter<MilestoneDTO>();
  @Output() removeEmitter = new EventEmitter<MilestoneDTO>();

  ngOnInit(): void {}

  remove(input: any) {
    this.removeEmitter.emit(this.value);
  }

  click(event: any) {
    this.selectEmitter.emit(this.value);
  }
}
