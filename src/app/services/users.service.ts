import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, ParsedUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ParsedUser[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map((users) =>
        users.map((user) => {
          const [firstName, lastName = ''] = user.name.split(' ');
          return {
            ...user,
            firstName,
            lastName,
          };
        })
      )
    );
  }
}
