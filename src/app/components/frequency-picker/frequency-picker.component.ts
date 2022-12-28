import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';

enum Frequency {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Montly',
}

enum Days {
  sunday = 'SUN',
  monday = 'MON',
  tuesday = 'TUE',
  wednesday = 'WED',
  thursday = 'THU',
  friday = 'FRI',
  saturday = 'SAT',
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

  daysOfWeek: String[] = [
    Days.monday,
    Days.tuesday,
    Days.wednesday,
    Days.thursday,
    Days.friday,
    Days.saturday,
    Days.sunday,
  ];

  frequencyPicker = new FormGroup({
    timeControl: new FormControl('08:00'),
    frequencyControl: new FormControl(Frequency.weekly),
    dayControl: new FormControl(''),
  });

  selectedDays = new Set<String>();

  constructor() {}

  ngOnInit(): void {}

  selectable() {}

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
    if (chip.selected) {
      this.selectedDays.add(chip.value);
    } else {
      this.selectedDays.delete(chip.value);
    }
  }

  toCron(): String {
    const [hours, minutes] = this.frequencyPicker
      .get('timeControl')!
      .value!.split(':');

    const days =
      this.selectedDays.size === 0
        ? '*'
        : Array.from(this.selectedDays).join(',');
    return [0, minutes, hours, '*', '*', days].join(' ');
  }

  buttonClick() {
    console.log(this.toCron());
  }
}
