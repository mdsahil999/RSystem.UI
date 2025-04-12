import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryRoutingModule } from './story-routing.module';
import { TableModule } from 'primeng/table';
import { StoryComponent } from './story/story.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class StoryModule { }
