import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { FullScreenModalComponent } from './full-screen-modal/full-screen-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizModalComponent } from './quiz-modal/quiz-modal.component';

export interface IQuiz {
  question: string;
  options: string[];
  id: number; 
}

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userAnswers: { [key: number]: string } = {};
  selectedQuiz: IQuiz | null = null;
  email:any
  visitedModals: boolean[] = [false, false, false, false];
  allModalData: any = [
    {
      title: 'All contracts identified as embedded leases must be input into PLASMA. The team uploading the contract must maintain supporting documentation for each entry.',
      bulletPoints: [
      ]
    },
    {
      title: 'This is applicable to leases charged to 416xx P&L (not stock). Reconciliation is performed by the RTR team and reviewed by the Group Controller. Following are the steps of how this is performed:',
      bulletPoints: [
        'Validate completeness and accuracy of SAP clearing account data.',
        'Investigate uncleared items and resolve within 90 days. Items unresolved beyond 90 days are reported as Value at Risk (VAR).',
        'Retain documentation for unreconciled balances.',
        'Review and approve by WD+7 as per local TOA.'
      ]
    },
    {
      title: 'Unresolved items beyond 90 days are reported as Value at Risk (VAR). Missing documentation or delays can trigger audit flags and affect financial integrity and control ratings.',
      bulletPoints: [
       
      ]
    },
    {
      title: 'Reporting & Approvals',
      bulletPoints: [
      ]
    },
    {
      title: 'Q&A & Rewards',
      bulletPoints: [
        'Hyperlink to Q&A form (e.g., Microsoft Forms).',
        'Top scorers + feedback form submitters win HUL Hampers.'
      ]
    },
    {
      title: 'Feedback Reminder',
      bulletPoints: [
        'Hyperlink to feedback form.',
        'Reminder: Only complete submissions qualify for the prize.'
      ]
    }
  ];

  quizzes: IQuiz[] = [
    {
      id: 1, // Added ID
      question: "Which of the following conditions indicated an embedded lease in a non-CLM contract?",
      options: [
        "Supplier used the asset for multiple clients",
        "Unilever obtains 60% of the assets output",
        "Unilever has the right to operate the asset",
        "Supplier has alternative assets available"
      ]
      // correctAnswerIndex is removed
    },
    {
      id: 2, // Added ID
      question: "What must be done when a contract is identified as an embedded lease?",
      options: [
        "Notify procurement",
        "Input the contract into PLASMA and retain evidence",
        "Archive the contract",
        "Send it to legal for review"
      ]
    },
    {
      id: 3, // Added ID
      question: "What is the deadline for resolving uncleared items in lease reconciliation?",
      options: [
        "30 days",
        "60 days",
        "90 days",
        "End of fiscal year"
      ]
    },
    {
      id: 4, // Added ID
      question: "Who is responsible for reviewing lease balance sheet reconciliation in HUL?",
      options: [
        "Procurement Manager",
        "RTR Team",
        "Group Controller",
        "Finance Analyst"
      ]
    },
    {
      id: 5, // Added ID
      question: "What is the consequence of not clearing matched items before the next period close?",
      options: [
        "They are written off",
        "They are reported as Value at Risk (VAR)",
        "They are escalated to legal",
        "They are reported as Value at Risk (VAR)",
      ]
    },
  ];
  

  constructor(private modalService: NgbModal,private quizService: ApiService){}


  openModal1() {
    this.modalService.open(FullScreenModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'full-screen-image'
    });
    this.visitedModals[0] = true;
  }
  
  openModal2() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.modalData = this.allModalData[0];
    this.visitedModals[1] = true;  // mark visited

  }
  openModal3() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.modalData = this.allModalData[1];
    this.visitedModals[2] = true;  // mark visited

  }
  openModal4() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.modalData = this.allModalData[2];
    this.visitedModals[3] = true;  // mark visited

  }
  openModal5() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.modalData = this.allModalData[3];
  }
  openModal6() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.modalData = this.allModalData[4];
  }
  get allInfoVisited(): boolean {
    return this.visitedModals.every(v => v);
  }
  openQuizModal(quizData: IQuiz) {
    const modalRef = this.modalService.open(QuizModalComponent, {
      centered: false, 
      backdrop: 'static',
      keyboard: false,
      fullscreen:true
    });

    modalRef.componentInstance.quiz = quizData;

    if (this.userAnswers && this.userAnswers[quizData.id]) {
      modalRef.componentInstance.preSelectedAnswer = this.userAnswers[quizData.id];
    }

    modalRef.result.then((result: { [key: number]: string } | null) => {
      if (result) {
        this.userAnswers = { ...this.userAnswers, ...result };
        console.log('Current answers:', this.userAnswers);
      }
    }).catch(() => {
    });
  }
}
