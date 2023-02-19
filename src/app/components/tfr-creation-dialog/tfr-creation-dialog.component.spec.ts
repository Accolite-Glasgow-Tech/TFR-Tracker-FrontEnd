import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TfrCreationDialogContent } from 'src/app/shared/interfaces';

import { TfrCreationDialogComponent } from './tfr-creation-dialog.component';

describe('TfrCreationDialogComponent', () => {
  let component: TfrCreationDialogComponent;
  let fixture: ComponentFixture<TfrCreationDialogComponent>;

  let tfrCreationDialogContent: TfrCreationDialogContent = {
    title: 'Discard',
    content: 'Changes were made',
    confirmText: 'Discard',
    cancelText: 'Cancel',
  };

  let matDialogRefSpy: MatDialogRef<any, any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationDialogComponent],
      imports: [MatButtonModule, MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: tfrCreationDialogContent,
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrCreationDialogComponent);
    component = fixture.componentInstance;
    matDialogRefSpy = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close on esc button', () => {
    component.onEsc();
    expect(matDialogRefSpy.close).toHaveBeenCalledWith('false');
  });
});
