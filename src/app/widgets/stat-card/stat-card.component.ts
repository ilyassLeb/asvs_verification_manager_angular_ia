import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent implements OnChanges {

  @Input() value!: number | string;
  @Input() label!: string;
  @Input() color!: string;

  chartType: ChartType = 'doughnut';
  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Used', 'Remaining'],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ['#3b82f6','#e5e7eb'], 
        borderWidth: 0
      }
    ]
  };

  ngOnChanges() {
    const val = typeof this.value === 'number' ? this.value : 50;

    this.chartData.datasets[0].data = [val, 100 - val];

    let mainColor = '#3b82f6'; 
    if (this.color === 'green') mainColor = '#22c55e';
    else if (this.color === 'red') mainColor = '#ef4444';
    else if (this.color === 'purple') mainColor = '#a855f7';

    this.chartData.datasets[0].backgroundColor = [mainColor, '#e5e7eb'];
  }
}