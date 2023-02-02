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
    If the withDelete is TRUE, an additional column with a delete symbol will 
    be added to the table created.
  */
  @Input() withDelete!: boolean;

  /*
    Signifies to the parent component that the delete symbol was clicked.
  */
  @Output() removeResourceEmitter: EventEmitter<AllocatedResourceTypeDTO> =
    new EventEmitter();
  removeResource(resource: AllocatedResourceTypeDTO) {
    this.removeResourceEmitter.emit(resource);
  }
}
