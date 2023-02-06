import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteGuardManagerService } from 'src/app/services/route-guard-manager/route-guard-manager.service';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      providers: [
        {
          provide: RouteGuardManagerService,
          useValue: jasmine.createSpyObj('RouteGuardManagerService', [
            'checkRouting'
          ])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
