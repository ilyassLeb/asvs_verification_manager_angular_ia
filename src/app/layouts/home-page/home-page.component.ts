import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { HeaderComponent } from '../header/header.component';
import { DashboardStatsComponent } from '../dashboard-stats/dashboard-stats.component';
import { CategoriesGridComponent } from '../categories-grid/categories-grid.component';
import { RequirementsListComponent } from '../requirements-list/requirements-list.component';
import { Checklist } from '../../models/checklist';
import { Category } from '../../models/category';
import { Requirement } from '../../models/requirement';
import { DataService } from '../../services/data.service';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
 imports: [CommonModule,RouterOutlet, FormsModule, MarkdownPipe, HeaderComponent,DashboardStatsComponent,CategoriesGridComponent,RequirementsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

   checklist: Checklist | null = null;
  selectedCategory: Category | null = null;
  selectedRequirement: Requirement | null = null;

  private shouldScrollToRequirements = false;
  private requirementsSectionRef?: ElementRef<HTMLDivElement>;


  @ViewChild('requirementsSection')
  set requirementsSection(value: ElementRef<HTMLDivElement> | undefined) {
    this.requirementsSectionRef = value;

    if (value && this.shouldScrollToRequirements) {
      this.scrollToRequirements();
      this.shouldScrollToRequirements = false;
    }
  }
  showAiExplanation: boolean = false;
  aiExplanation: string = '';
  aiLoading: boolean = false;
  activeTab: 'explanation' | 'bestPractices' | 'codeExample' | 'testing' = 'explanation';

  constructor(
    public dataService: DataService,
    public aiService: AiService
  ) {}

  ngOnInit(): void {
    this.dataService.checklist$.subscribe(checklist => {
      this.checklist = checklist;
    });

    this.aiService.isLoading$.subscribe(loading => {
      this.aiLoading = loading;
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.selectedRequirement = null;

    if (this.requirementsSectionRef) {
      this.scrollToRequirements();
    } else {
      this.shouldScrollToRequirements = true;
    }
  }

  private scrollToRequirements(): void {
    this.requirementsSectionRef?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  selectRequirement(req: Requirement): void {
    this.selectedRequirement = req;
    this.showAiExplanation = false;
    this.aiExplanation = '';
    this.activeTab = 'explanation';
  }

  selectOption(optionId: number): void {
    if (!this.selectedCategory || !this.selectedRequirement) return;
    
    this.dataService.selectOption(
      this.selectedCategory.name,
      this.selectedRequirement.id,
      optionId
    );
  }

  async loadAiExplanation(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.showAiExplanation = true;
    this.activeTab = 'explanation';

    if (this.selectedRequirement.aiExplanation) {
      this.aiExplanation = this.selectedRequirement.aiExplanation;
      return;
    }

    this.aiExplanation = await this.aiService.getExplanation(
      this.selectedRequirement.verificationRequirement
    );

    if (this.selectedCategory && this.selectedRequirement) {
      this.selectedRequirement.aiExplanation = this.aiExplanation;
      this.dataService.updateRequirement(
        this.selectedCategory.name,
        this.selectedRequirement.id,
        { aiExplanation: this.aiExplanation }
      );
    }
  }

  async loadBestPractices(): Promise<void> {
    if (!this.selectedRequirement) return;
    
    this.activeTab = 'bestPractices';
    this.aiExplanation = await this.aiService.getBestPractices(
      this.selectedRequirement.verificationRequirement
    );
  }

  async loadCodeExample(): Promise<void> {
    if (!this.selectedRequirement) return;
    
    this.activeTab = 'codeExample';
    this.aiExplanation = await this.aiService.getCodeExample(
      this.selectedRequirement.verificationRequirement,
      'C#' 
    );
  }

  async loadTestingGuidance(): Promise<void> {
    if (!this.selectedRequirement) return;
    
    this.activeTab = 'testing';
    this.aiExplanation = await this.aiService.getTestingGuidance(
      this.selectedRequirement.verificationRequirement
    );
  }

  exportJSON(): void {
    this.dataService.exportToJSON();
  }

  reset(): void {
      this.dataService.resetToDefault();
    
  }

}
