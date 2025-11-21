import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LeaderboardItem,
  WheelSector,
  WeekType,
} from '../../models/promotion.model';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
  // WHEEL
  spinNumber: number | null = null;
  wheelRotation = 'rotate(0deg)';
  errorMessage = '';
  totalRotations = 0;
  sectors: WheelSector[] = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    angle: i * 36,
  }));

  // LEADERBOARD
  leaderboard: LeaderboardItem[] = [];
  filteredLeaderboard: LeaderboardItem[] = [];
  activeFilter: WeekType | 'ALL' = 'ALL';
  weeks: WeekType[] = ['I', 'II', 'III', 'IV'];

  ngOnInit(): void {
    this.generateLeaderboard();
    this.filterLeaderboard('ALL');
  }

  // ===== WHEEL =====
  spinWheel(): void {
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
  generateLeaderboard(): void {
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

    this.leaderboard = [];

    for (let week of this.weeks) {
      for (let i = 1; i <= 10; i++) {
        this.leaderboard.push({
          customerId: Math.floor(Math.random() * 100000),
          loginName: `${names[Math.floor(Math.random() * names.length)]}${i}`,
          place: i,
          week: week,
        });
      }
    }
  }

  filterLeaderboard(filter: WeekType | 'ALL'): void {
    this.activeFilter = filter;
    this.filteredLeaderboard =
      filter === 'ALL'
        ? this.leaderboard
        : this.leaderboard.filter((item) => item.week === filter);
  }
}
