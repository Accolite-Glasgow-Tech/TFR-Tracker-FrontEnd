import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';

enum Frequency {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Montly',
  yearly = 'Yearly',
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
    Frequency.yearly,
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
    return '* * * * * *';
  }

  buttonClick() {
    console.log(Array.from(this.selectedDays).join(','));
  }
}
