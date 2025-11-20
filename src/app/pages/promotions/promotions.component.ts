import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type WeekType = 'I' | 'II' | 'III' | 'IV';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  spinNumber: number | null = null;
  wheelRotation: string = 'rotate(0deg)';
  errorMessage: string = '';
  totalRotations = 0;

  sectors = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    angle: i * 36,
  }));

  // ===== WHEEL =====

  spinWheel() {
    this.errorMessage = '';

    if (!this.spinNumber || this.spinNumber < 1 || this.spinNumber > 10) {
      this.errorMessage = 'აღნიშნული სექტორი ვერ მოიძებნა';
      return;
    }

    const sectorDegree = 36;
    this.totalRotations += 3;
    const targetRotation =
      360 * this.totalRotations - sectorDegree * this.spinNumber;

    this.wheelRotation = `rotate(${targetRotation}deg)`;
  }

  // ===== LEADERBOARD =====

  leaderboard: {
    customerId: number;
    loginName: string;
    place: number;
    week: WeekType;
  }[] = [];

  filteredLeaderboard = this.leaderboard;
  activeFilter: WeekType | 'ALL' = 'ALL';

  weeks: WeekType[] = ['I', 'II', 'III', 'IV'];

  ngOnInit() {
    this.generateLeaderboard();
    this.filterLeaderboard('ALL');
  }

  generateLeaderboard() {
    const names = [
      'john.doe',
      'jane.smith',
      'michael.brown',
      'emily.johnson',
      'david.wilson',
      'sarah.miller',
      'robert.moore',
      'linda.taylor',
    ];

    for (let week of this.weeks) {
      for (let i = 1; i <= 10; i++) {
        this.leaderboard.push({
          customerId: Math.floor(Math.random() * 100000),
          loginName: names[Math.floor(Math.random() * names.length)] + i,
          place: i,
          week: week,
        });
      }
    }
  }

  filterLeaderboard(filter: WeekType | 'ALL') {
    this.activeFilter = filter;

    if (filter === 'ALL') {
      this.filteredLeaderboard = this.leaderboard;
    } else {
      this.filteredLeaderboard = this.leaderboard.filter(
        (item) => item.week === filter
      );
    }
  }
}
