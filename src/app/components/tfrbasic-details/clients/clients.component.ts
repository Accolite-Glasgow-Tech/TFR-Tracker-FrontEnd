import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  ClientAttributeDTO,
  ClientDTO,
  ProjectBasicDetails,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private tfrManagementService: TfrManagementService
  ) {}

  @Input() editMode!: Boolean;
  @Input() existingDetails!: ProjectBasicDetails;

  clients!: ClientDTO[];
  attributes!: ClientAttributeDTO[];
  clientGroup!: FormGroup;

  @Output() onAttributesUpdated = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.clientGroup = new FormGroup({
      name: new FormControl(''),
    });

    this.api.clientReset.subscribe(() => {
      this.resetClientControls();
    });

    this.api.getClients().subscribe((data) => {
      this.clients = data;
      if (this.editMode) {
        // TODO fill in details of client and Attributes
        // find client in list with existingDetails.client_id and call select method
        this.clients.forEach((client) => {
          if (client.id == this.existingDetails.client_id) {
            this.onSelectedClient(client);
          }
        });
      }
    });

    this.clientGroup = new FormGroup({
      name: new FormControl(''),
      attributeValues: new FormArray([]),
    });

    this.getAttributes()
      .valueChanges.pipe(debounce(() => interval(500)))
      .subscribe(() => {
        this.onAttributesUpdated.emit(this.clientGroup);
      });
  }

  resetClientControls() {
    if (
      this.clientGroup.value.name !== this.tfrManagementService.getClientName
    ) {
      this.clientGroup
        .get('name')
        ?.setValue(this.tfrManagementService.getClientName);
      let previousClient: ClientDTO = this.clients.find(
        (client) => client.id === this.tfrManagementService.project?.client_id
      )!;
      this.onSelectedClient(previousClient);
    }
    this.existingDetails = this.tfrManagementService.getBasicDetails!;
    this.fillAttributesFromExisting();
  }

  fillAttributesFromExisting() {
    // parse values from existingDetails.client_specific
    // use to set values of form array
    if (this.attributes && this.existingDetails) {
      this.attributes.forEach((attribute, index) => {
        this.getAttributes()
          .at(index)
          .setValue(
            this.existingDetails.client_specific[attribute.attribute_name]
          );
      });
    }
  }

  @Output() onSelected = new EventEmitter<ClientDTO>();
  @Output() attributesSelected = new EventEmitter<ClientAttributeDTO[]>();
  onSelectedClient(client: ClientDTO) {
    this.getAttributes().reset();

    if (client) {
      this.clientGroup.get('name')?.setValue(client.name);

      this.onSelected.emit(client);

      this.api.getClientAttributes(client.id).subscribe((res) => {
        this.attributes = res;

        this.attributesSelected.emit(this.attributes);

        this.getAttributes().clear();

        //add a form control to form array for each attribute
        this.attributes.forEach((res) => {
          this.getAttributes().push(new FormControl('', [Validators.required]));
        });

        if (
          this.clientGroup.value.name ===
          this.tfrManagementService.getClientName
        ) {
          this.fillAttributesFromExisting();
        }
      });
    }
  }

  getAttributes(): FormArray {
    return this.clientGroup.controls['attributeValues'] as FormArray;
  }
}
