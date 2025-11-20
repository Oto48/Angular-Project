import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: any[] = [];
  userId: number | null = null;
  selectedPost: any = null;
  isModalOpen: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? +params['userId'] : null;

      this.http
        .get<any[]>('https://jsonplaceholder.typicode.com/posts')
        .subscribe((data) => {
          this.posts = this.userId
            ? data.filter((p) => p.userId === this.userId)
            : data;
        });
    });
  }

  openPostDetail(post: any) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedPost = null;
    this.isModalOpen = false;
  }
}
