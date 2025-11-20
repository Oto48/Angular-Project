import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: any[] = [];
  searchTerm: string = '';
  filteredUsers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data;
        this.filteredUsers = data;
      });
  }

  goToPosts(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  goToTodos(userId: number) {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }

  onSearchTermChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u) => {
      const firstName = u.name.split(' ')[0].toLowerCase();
      const lastName = u.name.split(' ')[1]?.toLowerCase() || '';
      const email = u.email.toLowerCase();
      return (
        firstName.includes(term) ||
        lastName.includes(term) ||
        email.includes(term)
      );
    });
  }
}
