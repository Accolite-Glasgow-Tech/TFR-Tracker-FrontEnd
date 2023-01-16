import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Frequency, DayOfMonth, daysOfWeek, range } from 'src/app/utils';

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss'],
})
export class FrequencyPickerComponent implements OnInit {
  frequencyEnum = Frequency;
  DayOfMonthEnum = DayOfMonth;
  today: Date = new Date();
  daysOfWeek = daysOfWeek;
  range = range;

  @Input() startDate = this.today;
  @Input() time = '08:00';
  @Input() recurring = false;
  @Input() frequency = Frequency.weekly;
  @Input() dayOfMonth = DayOfMonth.last;
  @Input() customDayofMonth = this.today.getDate();
  @Input() expirationDate: Date | null = null;

  frequencyPicker = new FormGroup({
    startDateControl: new FormControl(this.startDate, Validators.required),
    timeControl: new FormControl(this.time, Validators.required),
    recurringControl: new FormControl(this.recurring, Validators.required),
    frequencyControl: new FormControl(this.frequency, Validators.required),
    dayOfMonthControl: new FormControl(this.dayOfMonth),
    customDayofMonthControl: new FormControl(this.customDayofMonth),
    expirationDateControl: new FormControl<Date | null>(this.expirationDate),
  });

  selectedDays: Set<number> = new Set([this.today.getDay()]);
  firstSelection: Boolean = true;

  constructor() {}

  ngOnInit(): void {}

  createFormGroup(): FormGroup {
    return this.frequencyPicker;
  }

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

  getCron(): string {
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
}
