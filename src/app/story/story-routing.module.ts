import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: '',
    component: StoryComponent
  },
  {
    path: '**',
    component: StoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }