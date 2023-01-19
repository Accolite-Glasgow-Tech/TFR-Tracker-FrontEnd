import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesService } from 'src/app/routes.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

import { TfrComponent } from './tfr.component';

describe('TfrComponent', () => {
  let component: TfrComponent;
  let fixture: ComponentFixture<TfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      imports: [RouterTestingModule.withRoutes(RoutesService.RoutesList)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1,
              },
            },
          },
        },
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
