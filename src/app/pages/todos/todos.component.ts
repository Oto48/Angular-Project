import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todos: any[] = [];
  userId: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = +params['userId'];

      this.http
        .get<any[]>(
          `https://jsonplaceholder.typicode.com/todos?userId=${this.userId}`
        )
        .subscribe((data) => {
          this.todos = data;
        });
    });
  }
}
