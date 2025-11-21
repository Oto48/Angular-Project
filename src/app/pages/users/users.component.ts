import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParsedUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: ParsedUser[] = [];
  filteredUsers: ParsedUser[] = [];
  searchTerm = '';

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  onSearchTermChange(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  goToPosts(userId: number): void {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  goToTodos(userId: number): void {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }
}
