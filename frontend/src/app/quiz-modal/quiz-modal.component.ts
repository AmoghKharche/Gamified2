import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IQuiz } from "../app.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-quiz-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.css']
})
export class QuizModalComponent {
  @Input() quiz!: IQuiz;
  @Input() preSelectedAnswer: string | null = null;

  selectedOptionIndex: number | null = null;
  answers: Record<number, string> = {};

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.preSelectedAnswer) {
      const index = this.preSelectedAnswer.charCodeAt(0) - 65;
      this.selectedOptionIndex = index;
      this.answers[this.quiz.id] = this.preSelectedAnswer;
    }
  }

  selectOption(index: number) {
    this.selectedOptionIndex = index;
    const selectedLetter = String.fromCharCode(65 + index);
    this.answers[this.quiz.id] = selectedLetter;
    setTimeout(() => {
      this.activeModal.close(this.answers);
    }, 650);
  }
}
