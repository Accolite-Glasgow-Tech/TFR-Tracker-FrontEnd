import { Component } from '@angular/core';
import { user } from 'src/app/mock';
import { getUserTasksURL } from 'src/app/shared/utils';
import { TaskDTO } from 'src/app/shared/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.scss'],
})
export class UserSchedulesComponent {
  userTasks: TaskDTO[] = [];
  JSON = JSON;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserTasksById(user.id).subscribe((response) => {
      this.userTasks = <TaskDTO[]>response;
    });
  }
}
