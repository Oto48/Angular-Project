import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
}
