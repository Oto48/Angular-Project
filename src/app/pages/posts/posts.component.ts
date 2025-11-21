import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  isModalOpen = false;
  userId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? +params['userId'] : null;
      this.loadPosts();
    });
  }

  private loadPosts(): void {
    this.loading = true;

    const request$ = this.userId
      ? this.postsService.getPostsByUser(this.userId)
      : this.postsService.getAllPosts();

    request$.subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load posts';
        this.loading = false;
      },
    });
  }

  openPostDetail(post: Post): void {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedPost = null;
    this.isModalOpen = false;
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}
