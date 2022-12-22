import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface ResourceListType {
  resource_name: string;
  resource_id: string;
  selected: boolean;
}

@Component({
  selector: 'app-tfr-creation-resource',
  templateUrl: './tfr-creation-resource.component.html',
  styleUrls: ['./tfr-creation-resource.component.scss']
})
export class TfrCreationResourceComponent implements OnInit {

  selectedValue!: string;
  selectedCar!: string;
  selectedResources: ResourceListType[] = [];

  @Output() selectedResourceEmitter : EventEmitter<ResourceListType[]> = new EventEmitter();

  resources: ResourceListType[] = [
    {resource_name: 'Laura', resource_id: '1', selected: false},
    {resource_name: 'Rishali', resource_id: '2', selected: false},
    {resource_name: 'Marek', resource_id: '3', selected: false},
    {resource_name: 'Jack', resource_id: '4', selected: false},
    {resource_name: 'Mani', resource_id: '5', selected: false},
    {resource_name: 'Tom', resource_id: '6', selected: false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addingNewResource(selectedResource : ResourceListType){
    selectedResource.selected = true;
    this.selectedResources.push(selectedResource);
    this.selectedResourceEmitter.emit(this.selectedResources);
  }

  removeResource(removedResource : ResourceListType){
    removedResource.selected = false;
    const index = this.selectedResources.indexOf(removedResource, 0);
    if (index > -1) {
      this.selectedResources.splice(index, 1);
    }
    this.selectedResourceEmitter.emit(this.selectedResources);
  }

}
