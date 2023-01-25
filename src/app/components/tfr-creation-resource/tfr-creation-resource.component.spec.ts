import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, of } from 'rxjs';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  AllocatedResourceTypeDTO,
  ProjectResourceDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';
import {
  autoCompleteResourceNameValidator,
  autoCompleteRoleValidator,
  TfrCreationResourceComponent,
} from './tfr-creation-resource.component';

export class MatDialogMock {
  open(component: TfrCreationDialogComponent) {
    return {
      afterClosed: () => of('true'),
    };
  }
}

describe('TfrCreationResourceComponent', () => {
  let component: TfrCreationResourceComponent;
  let fixture: ComponentFixture<TfrCreationResourceComponent>;
  let roles: string[];
  let databaseRoles: string[];
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let projectResources: ProjectResourceDTO[];
  let resources: ResourceListType[];
  let projectResourcesWithNames: AllocatedResourceTypeDTO[];
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationResourceComponent],
      imports: [MatAutocompleteModule],
      providers: [
        FormBuilder,
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj('ResourceService', [
            'getAllRoles',
            'convertRoleEnum',
            'getAllResources',
            'getAssociatedCleanRole',
          ]),
        },
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj('TfrManagementService', [
            'getProjectResources',
            'setProjectResourcesWithNames',
            'getProjectId',
            'getProjectResourcesWithNames',
            'updateProjectToResourceMapping',
          ]),
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ],
    }).compileComponents();

    resourceServiceSpy = TestBed.inject(
      ResourceService
    ) as jasmine.SpyObj<ResourceService>;
    tfrManagementServiceSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;

    roles = ['TEAM LEAD', 'SCRUM MASTER', 'SOFTWARE DEVELOPER'];
    databaseRoles = ['TEAM_LEAD', 'SCRUM_MASTER', 'SOFTWARE_DEVELOPER'];
    resources = [
      {
        resource_name: 'John Makan',
        resource_email: 'johnmakan@accolitedigital.com',
        resource_id: 1,
        selected: false,
      },
      {
        resource_name: 'Yves Reed',
        resource_email: 'yvesreed@accolitedigital.com',
        resource_id: 2,
        selected: false,
      },
    ];
    projectResources = [
      {
        project_id: 1,
        resource_id: 1,
        role: 'TEAM_LEAD',
      },
      {
        project_id: 1,
        resource_id: 2,
        role: 'SCRUM_MASTER',
      },
    ];
    projectResourcesWithNames = [
      {
        project_id: 1,
        resource_email: 'johnmakan@accolitedigital.com',
        resource_id: 1,
        resource_name: 'John Makan',
        role: 'SCRUM MASTER',
      },
    ];

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof component>);

    resourceServiceSpy.getAllRoles.and.returnValue(of(databaseRoles));
    resourceServiceSpy.convertRoleEnum.and.returnValue(roles);
    resourceServiceSpy.getAllResources.and.returnValue(of(resources));
    tfrManagementServiceSpy.setProjectResourcesWithNames.and.returnValue();
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue();
    (tfrManagementServiceSpy as any).getProjectResources = projectResources;
    (tfrManagementServiceSpy as any).getProjectResourcesWithNames =
      projectResourcesWithNames;

    fixture = TestBed.createComponent(TfrCreationResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialise values', () => {
    expect(component.roles).toBe(roles);
    expect(component.resources).toBe(resources);
    expect(
      tfrManagementServiceSpy.setProjectResourcesWithNames.calls.count()
    ).toBe(1);
    expect(component).toBeTruthy();
  });

  it('role auto complete validator success', () => {
    let control = { value: 'SOFTWARE DEVELOPER' };
    let result = autoCompleteRoleValidator(roles)(control as AbstractControl);
    expect(result).toBeNull();
  });

  it('role auto complete validator error', () => {
    let control = { value: 'JUNIOR DEVELOPER' };
    let result = autoCompleteRoleValidator(roles)(control as AbstractControl);
    expect(result).toEqual({
      invalidAutoCompleteRole: { value: control.value },
    });
  });

  it('resource auto complete validator success', () => {
    let control = { value: 'John Makan' };
    let result = autoCompleteResourceNameValidator(resources)(
      control as AbstractControl
    );
    expect(result).toBeNull();
  });

  it('resource auto complete validator error', () => {
    let control = { value: 'Scott Mctominay' };
    let result = autoCompleteResourceNameValidator(resources)(
      control as AbstractControl
    );
    expect(result).toEqual({
      invalidAutoCompleteResourceName: { value: control.value },
    });
  });

  it('should add resource', () => {
    expect(component.resourceListUpdated).toBe(false);

    component.allocatedResources = [];
    (tfrManagementServiceSpy as any).getProjectId = 1;
    component.addResource('johnmakan@accolitedigital.com', 'SCRUM MASTER');

    fixture.detectChanges();

    expect(component.resourceListUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(true);
    expect(component.allocatedResources.length).toBe(1);
    expect(
      component.allocatedResources.find((resource) => {
        return (
          resource.resource_email ===
          projectResourcesWithNames[0].resource_email
        );
      })
    ).toEqual(projectResourcesWithNames[0]);
  });

  it('should remove resource', () => {
    expect(component.resourceListUpdated).toBe(false);

    component.removeResource(1);
    fixture.detectChanges();

    expect(component.resourceListUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(false);
    expect(
      component.allocatedResources.find((resource) => {
        return resource.resource_email === 'johnmakan@accolitedigital.com';
      })
    ).toEqual(undefined);
  });

  it('trigger next step', () => {
    spyOn(component, 'showDialog');
    component.resourceListUpdated = true;
    component.triggerStep(true);
    fixture.detectChanges();
    expect(component.showDialog).toHaveBeenCalled();
  });

  it('trigger previous step', () => {
    spyOn(component, 'nextStep');
    component.resourceListUpdated = false;
    component.triggerStep(true);
    fixture.detectChanges();
    expect(component.nextStep).toHaveBeenCalled();
  });

  it('emit on next step', () => {
    const emitterValue: boolean = true;
    component.stepCompletedEmitter
      .pipe(first())
      .subscribe((forward: boolean) => {
        expect(forward).toBe(emitterValue);
      });
    component.nextStepEmitter.pipe(first()).subscribe((forward: boolean) => {
      expect(forward).toBe(emitterValue);
    });

    component.nextStep(true);
    fixture.detectChanges();
  });

  it('call service to save to database', () => {
    component.saveToDatabase();
    fixture.detectChanges();
    expect(component.resourceListUpdated).toBe(false);
  });

  it('reset all resources', () => {
    component.resetResources();
    fixture.detectChanges();
    expect(component.allocatedResources).toEqual(projectResourcesWithNames);
    expect(component.resources.length).toBe(2);
    expect(component.resources[0].selected).toBe(true);
    expect(component.resourceListUpdated).toBe(false);
  });

  it('show Dialog box', () => {
    component.showDialog(true);
    fixture.detectChanges();

    expect(dialogSpy).toHaveBeenCalledWith(TfrCreationDialogComponent);
  });
});
