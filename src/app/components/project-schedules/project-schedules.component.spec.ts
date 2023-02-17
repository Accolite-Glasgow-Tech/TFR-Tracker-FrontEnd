import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Params } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

import { ProjectSchedulesComponent } from './project-schedules.component';

describe('ProjectSchedulesComponent', () => {
  let component: ProjectSchedulesComponent;
  let fixture: ComponentFixture<ProjectSchedulesComponent>;
  let params: Params = {
    id: '1',
  };
  let mockRoute: any = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    [],
    {
      paramMap: of(convertToParamMap(params)),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSchedulesComponent],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getProjectTasks',
            'deleteTaskById',
          ]),
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj('SnackBarService', ['showSnackBar']),
        },
        {
          provide: ActivatedRoute,
          useValue: mockRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
