import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'story',
    loadChildren: () => import("../app/story/story.module").then(e => e.StoryModule)
  },
  {
    path: '**',
    redirectTo: 'story'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
