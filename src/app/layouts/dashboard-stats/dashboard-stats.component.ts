import { Component, Input } from '@angular/core';
import { Checklist } from '../../models/checklist';
import { StatCardComponent } from '../../widgets/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.css'
})
export class DashboardStatsComponent {
    @Input() checklist!: Checklist;


}
