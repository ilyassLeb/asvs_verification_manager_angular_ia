import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() active: boolean = false;

  @Output() categorySelected = new EventEmitter<any>();

  selectCategory() {
    this.categorySelected.emit(this.category);
  }
}
