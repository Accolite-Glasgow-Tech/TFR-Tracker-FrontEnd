import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

enum Frequency {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Montly',
  yearly = 'Yearly',
}

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss'],
})
export class FrequencyPickerComponent implements OnInit {
  frequency: String = Frequency.daily;

  frequencyControl = new FormControl<String>(this.frequency);
  frequencies: String[] = [
    Frequency.daily,
    Frequency.weekly,
    Frequency.monthly,
    Frequency.yearly,
  ];

  constructor(cron: String) {}

  ngOnInit(): void {}

  toCron(): String {
    return '* * * * * *';
  }
}
