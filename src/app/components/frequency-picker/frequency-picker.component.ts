import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';

enum Frequency {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}

enum DayOfMonth {
  first = 'First',
  last = 'Last',
  specificLast = 'SpecificLast',
  custom = 'Custom',
}

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss'],
})
export class FrequencyPickerComponent implements OnInit {
  frequencyEnum = Frequency;
  DayOfMonthEnum = DayOfMonth;
  today: Date = new Date();

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
    startDateControl: new FormControl(this.today, Validators.required),
    timeControl: new FormControl('08:00', Validators.required),
    reccuringControl: new FormControl(false, Validators.required),
    frequencyControl: new FormControl(Frequency.weekly, Validators.required),
    dayOfMonthControl: new FormControl(DayOfMonth.last),
    customDayofMonthControl: new FormControl(this.today.getDate()),
    expirationDateControl: new FormControl<Date | null>(null),
  });

  selectedDays: Set<number> = new Set([this.today.getDay()]);
  firstSelection: Boolean = true;
  cron: string = '';

  constructor() {}

  ngOnInit(): void {}

  frequencyChange(): void {
    this.today = new Date();
    this.firstSelection = true;
    this.selectedDays = new Set([this.today.getDay()]);
  }

  toggleSelection(chip: MatChip): void {
    if (!this.selectedDays.has(chip.value)) {
      if (this.firstSelection) {
        this.selectedDays.clear();
        this.firstSelection = false;
      }
      this.selectedDays.add(chip.value);
    } else if (this.selectedDays.size > 1) {
      this.selectedDays.delete(chip.value);
    }
  }

  getCron(): String {
    const cronSecond: number = 0;
    const [cronHour, cronMinute] = this.frequencyPicker
      .get('timeControl')!
      .value!.split(':');

    const customDayOfMonth = this.frequencyPicker.get(
      'customDayofMonthControl'
    )!.value;

    let cronDayOfMonth: string = '*';
    let cronMonth = '*';
    let cronDayOfWeek: string = '*';
    switch (this.frequencyPicker.get('frequencyControl')!.value) {
      case Frequency.weekly:
        cronDayOfWeek = Array.from(this.selectedDays).sort().join(',');
        break;
      case Frequency.monthly:
        switch (this.frequencyPicker.get('dayOfMonthControl')!.value) {
          case DayOfMonth.first:
            cronDayOfMonth = '1';
            break;
          case DayOfMonth.last:
            cronDayOfMonth = 'L';
            break;
          case DayOfMonth.specificLast:
            cronDayOfMonth = this.today.getDay().toString() + 'L';
            break;
          case DayOfMonth.custom:
            cronDayOfMonth = customDayOfMonth!.toString();
        }
        break;
    }
    return [
      cronSecond,
      cronMinute,
      cronHour,
      cronDayOfMonth,
      cronMonth,
      cronDayOfWeek,
    ].join(' ');
  }

  updateCron() {
    this.cron = this.getCron().toString();
  }

  interval = setInterval(() => this.updateCron(), 100);
}
