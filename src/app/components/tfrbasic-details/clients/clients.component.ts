import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
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
    private tfrManagementService: TfrManagementService,
    private responseHandler: ResponseHandlerService
  ) {}

  @Input() editMode!: Boolean;
  @Input() existingDetails!: ProjectBasicDetails;
  @Output() onAttributesUpdated = new EventEmitter<FormGroup>();

  clients!: ClientDTO[];
  attributes!: ClientAttributeDTO[];
  clientGroup!: FormGroup;
  allAttributes!: ClientAttributeDTO[][];

  getClientsObserver = {
    next: (data: ClientDTO[]) => {
      this.clients = data;

      this.api
        .getAllClientAttributes()
        .subscribe(this.getAllClientAttributesObserver);
    },
  };

  getAllClientAttributesObserver = {
    next: (res: ClientAttributeDTO[][]) => {
      this.allAttributes = res;

      if (this.editMode) {
        this.clients.forEach((client) => {
          if (client.id == this.existingDetails.client_id) {
            this.onSelectedClient(client);
          }
        });
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status === 0) {
        this.responseHandler.badGet();
      }
    },
  };

  ngOnInit() {
    this.tfrManagementService.clientReset.subscribe(() => {
      this.resetClientControls();
    });

    this.api.getClients().subscribe(this.getClientsObserver);

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
  onSelectedClient(client: ClientDTO | undefined) {
    this.getAttributes().clear();

    if (client) {
      this.clientGroup.get('name')?.setValue(client.name);

      this.onSelected.emit(client);

      this.attributes = this.allAttributes[client.id - 1];

      this.attributesSelected.emit(this.attributes);

      this.getAttributes().clear();

      this.attributes.forEach((res) => {
        this.getAttributes().push(new FormControl('', [Validators.required]));
      });

      if (
        this.clientGroup.value.name === this.tfrManagementService.getClientName
      ) {
        this.fillAttributesFromExisting();
      }
    } else {
      this.attributes = [];
    }
  }

  getAttributes(): FormArray {
    return this.clientGroup.controls['attributeValues'] as FormArray;
  }
}
