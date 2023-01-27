import { Component ,Output, EventEmitter} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-manage-widget-modal',
  templateUrl: './manage-widget-modal.component.html',
  styleUrls: ['./manage-widget-modal.component.scss']
})


export class ManageWidgetModalComponent {
  constructor(public modalRef: MdbModalRef<ManageWidgetModalComponent>) {}
 
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    console.log(value);
  }
}
