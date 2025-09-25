import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-full-screen-modal',
  imports: [],
  templateUrl: './full-screen-modal.component.html',
  styleUrl: './full-screen-modal.component.css'
})
export class FullScreenModalComponent {
  constructor(public activeModal:NgbActiveModal) {}

}
