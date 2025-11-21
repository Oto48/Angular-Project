import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  userId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? +params['userId'] : null;
      if (this.userId !== null) {
        this.loadTodos(this.userId);
      }
    });
  }

  private loadTodos(userId: number): void {
    this.loading = true;
    this.error = null;

    this.todosService.getTodosByUser(userId).subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load todos';
        this.loading = false;
      },
    });
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}
