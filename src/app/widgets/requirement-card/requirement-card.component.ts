import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Requirement } from '../../models/requirement';

@Component({
  selector: 'app-requirement-card',
  standalone: true,
  imports: [],
  templateUrl: './requirement-card.component.html',
  styleUrl: './requirement-card.component.css'
})
export class RequirementCardComponent {


   @Input() requirement!: Requirement;

  @Output() review = new EventEmitter<Requirement>();

  selectRequirement() {
    this.review.emit(this.requirement);
  }

}
