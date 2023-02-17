import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { NotesDialogComponent } from './notes-dialog.component';

describe('NotesDialogComponent', () => {
  let component: NotesDialogComponent;
  let fixture: ComponentFixture<NotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesDialogComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
