import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';

enum Frequency {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Montly',
}

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss'],
})
export class FrequencyPickerComponent implements OnInit {
  eFrequency = Frequency;
  frequencies: String[] = [
    Frequency.daily,
    Frequency.weekly,
    Frequency.monthly,
  ];

  daysOfWeek: Map<number, String> = new Map([
    [0, 'Sunday'],
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday'],
  ]);

  frequencyPicker = new FormGroup({
    timeControl: new FormControl('08:00', Validators.required),
    frequencyControl: new FormControl(Frequency.weekly, Validators.required),
    dayOfWeekControl: new FormControl([new Date().getDay()]),
    dayOfMonthControl: new FormControl([]),
  });

  selectedDays: Set<number> = new Set([new Date().getDay()]);
  selectedMonthDays: Set<number> = new Set([new Date().getDate()]);
  firstSelection: Boolean = true;

  constructor() {}

  ngOnInit(): void {}

  range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => i);
  }

  frequencyChange() {
    this.firstSelection = true;
    this.selectedDays = new Set([new Date().getDay()]);
  }

  toggleSelection(chip: MatChip) {
    if (!this.selectedDays.has(chip.value)) {
      this.selectedDays.add(chip.value);
      this.firstSelection = false;
    } else if (this.selectedDays.size > 1) {
      this.selectedDays.delete(chip.value);
    }
  }

  toCron(): String {
    // const [hours, minutes] = this.frequencyPicker
    //   .get('timeControl')!
    //   .value!.split(':');

    // const days =
    //   this.selectedDays.size === 0
    //     ? '*'
    //     : Array.from(this.selectedDays).join(',');
    // return [0, minutes, hours, '*', '*', days].join(' ');
    return '';
  }

  buttonClick() {
    console.log(Array.from(this.selectedDays).sort());
  }
}
