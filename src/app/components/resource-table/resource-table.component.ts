import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss'],
})
export class ResourceTableComponent {
  /*
    This list of all the resources for this project contains:
      project_id, resource id, name, email and their role in the project 
  */
  @Input() resourcesWithNames!: AllocatedResourceTypeDTO[];

  /*
    If the withEdit is TRUE, an additional column with a delete and edit symbol will 
    be added to the table created.
  */
  @Input() withEdit!: boolean;

  /*
    Signifies to the parent component that the delete symbol was clicked.
  */
  @Output() removeResourceEmitter: EventEmitter<AllocatedResourceTypeDTO> =
    new EventEmitter();
  @Output() editResourceEmitter: EventEmitter<AllocatedResourceTypeDTO> =
    new EventEmitter();

  removeResource(resource: AllocatedResourceTypeDTO) {
    this.removeResourceEmitter.emit(resource);
  }

  editResource(resource: AllocatedResourceTypeDTO) {
    this.editResourceEmitter.emit(resource);
  }
}
