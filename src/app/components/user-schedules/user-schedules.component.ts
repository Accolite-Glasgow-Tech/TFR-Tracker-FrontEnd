import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { userService } from 'src/app/services/user/user.service';
import { TaskResourceDTO, UserTaskDTO } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.scss'],
})
export class UserSchedulesComponent {
  loading: boolean = true;
  userTasks: UserTaskDTO[] = [];
  displayedColumns = [
    'project_name',
    'frequency',
    'next_occurrence',
    'task_type',
    'enabled',
  ];
  projectNameLable = 'Project';
  taskTypeLable = 'Type of schedule';

  constructor(
    private apiService: ApiService,
    private UserService: userService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    const userId = this.UserService.getUserID();
    if (!Number.isNaN(userId)) {
      this.apiService.getUserTasks(<number>userId).subscribe({
        next: (response: any) => (this.userTasks = <UserTaskDTO[]>response),
        error: (error: HttpErrorResponse) => {
          this.snackBarService.showSnackBar(error.error);
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    }
  }

  onToggle(event: any, userTask: UserTaskDTO) {
    const taskResourceDTO: TaskResourceDTO = {
      task_id: userTask.task_id,
      resource_id: userTask.resource_id,
      enabled: event.checked,
    };
    this.loading = true;
    this.apiService.putTaskAvailability(taskResourceDTO).subscribe({
      next: () =>
        this.snackBarService.showSnackBar('Schedule updated successfully'),
      error: (error: HttpErrorResponse) => {
        this.snackBarService.showSnackBar(error.error);
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
