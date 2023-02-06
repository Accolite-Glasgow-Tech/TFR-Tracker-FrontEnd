import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteGuardManagerService } from 'src/app/services/route-guard-manager/route-guard-manager.service';
import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        {
          provide: RouteGuardManagerService,
          useValue: jasmine.createSpyObj('RouteGuardManagerService', 
            ['checkRouting']
        )
        },
        {
          provide: SidenavToggleService,
          useValue: jasmine.createSpyObj([''])
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggle when button is pressed', () => {});
});
