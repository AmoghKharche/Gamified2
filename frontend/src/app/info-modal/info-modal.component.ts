import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  template: `
<div class="custom-modal-header d-flex justify-content-between align-items-center">
  <h5 class="modal-title">{{ modalData?.title }}</h5>
  <button type="button" class="close-button" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <i class="bi bi-x-circle-fill"></i>
  </button>
</div>

<ng-container *ngIf="modalData?.bulletPoints">
  <div class="custom-modal-body" >
    <ol class="ps-3">
      <li *ngFor="let point of modalData?.bulletPoints">
        {{ point }}
      </li>
    </ol>
  </div>
</ng-container>
  `,
  styleUrls: ['./info-modal.component.css'],
  imports:[CommonModule]
})
export class InfoModalComponent {
  @Input() modalData: { title: string; bulletPoints: string[] } | null = null;
  constructor(public activeModal: NgbActiveModal) {}
}
