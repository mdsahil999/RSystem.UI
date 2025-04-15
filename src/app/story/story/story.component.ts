import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../models/story.model';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  stories: Story[] = [];
  loading = false;  // Add a loading state for better UX
  @ViewChild('dt1') dt1: any;

  constructor(private service: StoryService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories(): void {
    this.loading = true;  // Set loading to true before starting the API call
    this.service.getAll().subscribe({
      next: (response: Story[]) => {
        this.stories = response;
        this.loading = false;  // Set loading to false after the data is fetched
      },
      error: (error) => {
        console.error('Error loading stories:', error);
        this.loading = false;  // Set loading to false in case of error
      }
    });
  }

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt1.filterGlobal(input.value, 'contains');
  }
}
