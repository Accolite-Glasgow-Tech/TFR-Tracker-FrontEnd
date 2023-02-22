import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { TaskDTO } from 'src/app/shared/interfaces';
import { log } from 'src/app/shared/utils';

@Component({
  selector: 'app-project-schedules',
  templateUrl: './project-schedules.component.html',
  styleUrls: ['./project-schedules.component.scss'],
})
export class ProjectSchedulesComponent {
  loading: boolean = true;
  projectId!: number;
  tasks: TaskDTO[] = [];
  displayedColumns = [
    'frequency',
    'task_type',
    'next_occurrence',
    'expiration_date',
    'recurring',
    'by_email',
    'edit',
    'delete',
  ];
  taskTypeLable = 'Type of schedule';

  constructor(
    private apiService: ApiService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      this.projectId = Number(result.get('id'));
      if (!Number.isNaN(this.projectId)) {
        this.apiService.getProjectTasks(this.projectId).subscribe({
          next: (response: any) => (this.tasks = <TaskDTO[]>response),
          error: (error: HttpErrorResponse) =>
            this.snackBarService.showSnackBar(error.error),
          complete: () => (this.loading = false),
        });
      }
    });
  }

  cronToFrequency(cron: string): string {
    if (cron === null) return 'One off';
    let temp = cron.split(' ');
    if (temp[3] !== '*') return 'Monthly';
    if (temp[5] !== '*') return 'Weekly';
    if (temp[4] === '*') return 'Daily';
    return '';
  }

  deleteTask(taskId: number) {
    this.loading = true;
    this.apiService.deleteTaskById(taskId).subscribe({
      next: () => {
        this.snackBarService.showSnackBar('Task deleted successfully');
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      error: (error: HttpErrorResponse) =>
        this.snackBarService.showSnackBar(error.error),
      complete: () => (this.loading = false),
    });
    log(taskId);
  }
}
