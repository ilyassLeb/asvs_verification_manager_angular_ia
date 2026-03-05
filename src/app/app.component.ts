
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { AiService } from './services/ai.service';
import { Checklist } from './models/checklist';
import { Category } from './models/category';
import { Requirement } from './models/requirement';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { HeaderComponent } from "./layouts/header/header.component";
import { DashboardStatsComponent } from './layouts/dashboard-stats/dashboard-stats.component';
import { StatCardComponent } from './widgets/stat-card/stat-card.component';
import { CategoryCardComponent } from './widgets/category-card/category-card.component';
import { CategoriesGridComponent } from './layouts/categories-grid/categories-grid.component';
import { RequirementsListComponent } from './layouts/requirements-list/requirements-list.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, FormsModule, MarkdownPipe, HeaderComponent,DashboardStatsComponent,CategoriesGridComponent,RequirementsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
 

}