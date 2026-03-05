import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';
import { Requirement } from '../../models/requirement';
import { RequirementCardComponent } from '../../widgets/requirement-card/requirement-card.component';

@Component({
  selector: 'app-requirements-list',
  standalone: true,
    imports: [CommonModule,RequirementCardComponent],
  templateUrl: './requirements-list.component.html',
  styleUrl: './requirements-list.component.css'
})
export class RequirementsListComponent {

  @Input() category!: Category | null;

  @Output() requirementSelected = new EventEmitter<Requirement>();
}
