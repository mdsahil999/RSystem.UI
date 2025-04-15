import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryRoutingModule } from './story-routing.module';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { StoryComponent } from './story/story.component';


@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    TableModule,
    InputIconModule,
    InputTextModule
  ]
})
export class StoryModule { }
