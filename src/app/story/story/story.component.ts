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
  @ViewChild('dt1') dt1: any;

  constructor(private service: StoryService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories(): void {
    this.service.getAll().subscribe({
      next: (response: Story[]) => {
        this.stories = response;
      },
      error: (error) => {
        console.error('Error loading stories:', error);
      }
    });
  }

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt1.filterGlobal(input.value, 'contains');
  }
}
