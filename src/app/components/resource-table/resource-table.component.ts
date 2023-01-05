import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AllocatedResourceType } from 'src/app/types/types';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss'],
})
export class ResourceTableComponent {
  @Input() resourcesWithNames!: AllocatedResourceType[];
  @Input() withDelete!: boolean;
  @Output() removeResourceEmitter: EventEmitter<number> = new EventEmitter();
  removeResource(resource_id: number) {
    this.removeResourceEmitter.emit(resource_id);
  }
}
