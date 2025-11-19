import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentTime$ = interval(1000).pipe(
    startWith(0),
    map(() => new Date().toLocaleString())
  );
}
