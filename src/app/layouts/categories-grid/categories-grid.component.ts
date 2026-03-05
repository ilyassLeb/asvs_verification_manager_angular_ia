import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../widgets/category-card/category-card.component';

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories-grid.component.html',
  styleUrl: './categories-grid.component.css'
})
export class CategoriesGridComponent {


   @Input() categories!: Category[];
  @Input() selectedCategory!: Category | null;

  @Output() categorySelected = new EventEmitter<Category>();

   onCategorySelected(category: Category) {
    this.categorySelected.emit(category);
  }
}
