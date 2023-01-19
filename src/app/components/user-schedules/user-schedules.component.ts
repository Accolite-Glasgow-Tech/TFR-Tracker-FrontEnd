import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { user } from 'src/app/mock';
import { getUserTasksURL } from 'src/app/shared/utils';
import { TaskDTO } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.scss'],
})
export class UserSchedulesComponent {
  userTasks: TaskDTO[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(getUserTasksURL(user.id!)).subscribe((response) => {
      this.userTasks = <TaskDTO[]>response;
    });
  }
}
